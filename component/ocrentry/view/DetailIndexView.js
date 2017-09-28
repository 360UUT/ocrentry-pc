/// <reference path="../tmpls/detail-index-tmpl.html" />
/// <reference path="../tmpls/detail-index-desc-tmpl.html" />
/// <reference path="../tmpls/detail-index-content-tmpl.html" />
/**
 * HomeView
 */
define('component/ocrentry/view/DetailIndexView',
    [
        'jquery',
        'underscore',
        'backbone',
        'view/BaseView',
        'text!../tmpls/detail-index-tmpl.html',
        'component/ocrentry/services/OcrService',
        'text!../tmpls/detail-index-desc-tmpl.html',
        'text!../tmpls/detail-index-content-tmpl.html'
    ],
    function ($, _, Backbone, BaseView, homeTpl, OcrService, descTmpl, detailcontenTmpl) {
        return BaseView.extend({
            appendable: true,
            $container: $("body"),
            events: {
            },
            beforeInitialize: function (options) {
            },
            afterInitialize: function (options) {
            },
            textTemplate: homeTpl,
            beforeRender: function (data) {
            },
            afterRender: function (data) {
            },
            show: function (teamInfo) {
                var _this = this;
                _this.$el.modal();
                _this.$el.find(".modal-body").empty();
                var text = _.template(descTmpl)(teamInfo);
                _this.$el.find(".modal-body").append(text);

                OcrService.GetPageList({
                    pageIndex: 1,
                    pageSize: 500,
                    teamId: teamInfo.GuestTeamId
                }).done(function (response) {
                    var contentText = _.template(detailcontenTmpl)(response);
                    _this.$el.find(".modal-body").append(contentText);
                });
            }
        });
    });