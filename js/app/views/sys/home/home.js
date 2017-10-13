// View.js
// -------
define(["jquery", "backbone", "underscore", "client", "utils", "store",
    "app/models/Model", "text!app/views/sys/home/home.html", 'css!app/views/sys/home/home.css'],

    function ($, Backbone, _, Client, Utils, Store, Model, template) {

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
                "click #newxtPage": "goNextPage"
            },

            // Renders the view's template to the UI
            render: function () {

                // Setting the view's template property using the Underscore template method
                this.template = _.template(template, {});

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);

                //this.initUserList();

                // jquery mobile初始化页面
                this.$el.trigger('create');

                // Maintains chainability
                return this;

                //http://localhost:8181/infoskyalp/admin?login

            },

            goNextPage: function () {
                Utils.jumpToPage("user-list");
            }

        });

        // Returns the View class
        return View;

    }
);