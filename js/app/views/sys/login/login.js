// View.js
// -------
define(["jquery", "backbone", 'client', 'utils', 'store',
    "app/models/Model", "text!app/views/sys/login/login.html", 'css!app/views/sys/login/login.css'],

    function ($, Backbone, Client, Utils, Store, Model, template) {

        var View = Backbone.View.extend({

            // The DOM Element associated with this view
            el: "[data-role='page']",

            // View constructor
            initialize: function () {

                // Calls the view's render method
                this.render();

            },

            // View Event Handlers
            events: {
                "click #submitBtn": "login",
            },

            // Renders the view's template to the UI
            render: function () {

                // Setting the view's template property using the Underscore template method
                this.template = _.template(template, {});

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);

                // Maintains chainability
                return this;

                //http://localhost:8181/infoskyalp/admin?login

            },

            login: function () {
                var self = this;
                var loginData = {
                    'companycode': $('#companycode').val(),
                    'username': $('#username').val(),
                    'password': $('#password').val()
                };
                if($('#rememberMe').prop('checked')){
                    loginData.rememberMe = 'on';
                }
                if($('#validateCode')){
                    loginData.validateCode = $('#validateCode').val();
                }

                Client.login(loginData, function (rs) {
                    self.undelegateEvents();
                    if (rs && rs.data && rs.state == 1) {
                        Store.setData('myInfo', rs.data);
                        Utils.getRouter().navigate("forward/home", {trigger: true, replace: false});
                    } else {
                        alert('登录失败');
                    }
                });
            },

        });

        // Returns the View class
        return View;

    }
);