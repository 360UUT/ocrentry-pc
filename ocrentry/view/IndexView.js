/**
 * HomeView
 */
define('component/ocrentry/view/IndexView',
    [
        'jquery',
        'underscore',
        'backbone',
        'view/BaseView',
        'text!../tmpls/IndexViewTmpl.html',
         'component/ocrentry/services/OcrService',
        'text!../tmpls/left-grouptype-tmpl.html',
        'text!../tmpls/right-content-tmpl.html',
        'component/ocrentry/view/DetailIndexView',
        'css!../style/ocr-entry.css'
    ],
    function ($, _, Backbone, BaseView, homeTpl, OcrService, leftGrouptypeTmpl, rightContentTmpl, DetailIndexView) {
        return BaseView.extend({
            appendable: true,
            $container: $("body"),
            events: {
                "click .list-group-item": "itemOnClick",
                'submit .searchForm': 'searchFormOnSubmit',
                'click .btnSave': "btnSaveOnClick"
            },
            beforeInitialize: function (options) {
                this.catelogId = '';
                this.type = 'All';
                this.Keyword = '';
                this.groupList = [];
            },
            afterInitialize: function (options) {
            },
            textTemplate: homeTpl,
            beforeRender: function (data) {
            },
            afterRender: function (data) {
                var _this = this;
                _this.detailIndexView = new DetailIndexView({});
                _this.detailIndexView.render({});
            },
            itemOnClick: function (evt) {
                var _this = this;
                var $target = $(evt.currentTarget);

                if ($target.data("side") == "0") {
                    if (!$target.hasClass("active")) {
                        $target.parent().find(".active").removeClass("active");
                        $target.addClass("active");
                    }
                    _this.type = $target.data("type");
                    _this.catelogId = $target.data("cateId");
                    _this.loadGroupList();
                } else {
                    _this.detailIndexView.show(_.findWhere(_this.groupList, { GuestTeamId: $target.data("teamId") }));
                }
            },

            searchFormOnSubmit: function (evt) {
                evt.preventDefault();
                this.Keyword = searchForm.searchInput.value;
                this.loadGroupList();
            },

            show: function () {
                var _this = this;
                _this.$el.modal();
                OcrService.GetCategoriesOfMe().done(function (response) {
                    _this.$el.find(".groupTypeList").html(_.template(leftGrouptypeTmpl)(response));
                });
                this.type = "All"
                _this.loadGroupList();
            },

            loadGroupList: function () {
                var _this = this;
                _this.$el.find(".right-conent-list").html("<p style='padding:20px'>正在加载...</p>");
                OcrService.GetTeamInfoOfCategory({
                    CustomCategoryId: this.catelogId,
                    CategoryMode: this.type,
                    Keyword: this.Keyword
                }).done(function (response) {
                    _this.groupList = response.Result;
                    // console.log(response);
                    var text = _.template(rightContentTmpl)(response);
                    //  console.log(text);
                    _this.$el.find(".right-conent-list").html(text);
                });
            },
            btnSaveOnClick: function () {
                
            }
        });
    }
);