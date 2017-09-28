define([
        'jquery',
        'underscore',
        'backbone',
        'common/AjaxHelper'
], function ($, _, Backbone, AjaxHelper) {
    var serviceName = "UtilityService";
    var apiPrefix = "api/GuestTeamService";
    return new function () {
        this.GetTeamInfoOfCategory = function (input, httpParams) {
            return Backbone.ajax(_.extend({
                url: "/api/GuestTeamService/GetTeamInfoOfCategory",
                method: 'GET',
                // contentType: "application/json; charset=utf-8",
                data: input
            }, httpParams));
        };
        this.GetCategoriesOfMe = function (input, httpParams) {
            return Backbone.ajax(_.extend({
                url: "/api/GuestTeamService/GetCategoriesOfMe",
                method: 'GET',
                // contentType: "application/json; charset=utf-8",
                data: input
            }, httpParams));
        };

        this.GetPageListByTeamIdList = function (input, httpParams) {
            return Backbone.ajax(_.extend({
                url: "/api/GuestTeamService/GetPageListByTeamIdList",
                method: 'GET',
                // contentType: "application/json; charset=utf-8",
                data: input
            }, httpParams));
        };

        this.GetGuestImageDataPageList = function (teamId, pageIndex, pageSize, httpParams) {
            return Backbone.ajax(_.extend({
                url: "/api/GuestTeamService/GetGuestImageDataPageList/" + teamId + "/" + pageIndex + "/" + pageSize,
                method: 'GET'
            }, httpParams));
        };


        this.GetPageList = function (input) {
            return Backbone.ajax({
                url: "/api/GuestTeamService/GetPageList",
                method: 'GET',
                data:input
            });
        };
    };
});