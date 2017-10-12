// MobileRouter.js
// ----------------
define(["jquery", "backbone", "app/views/sys/login/login", "app/views/sys/home/home", "app/views/sys/user-list/user-list"],

    function ($, Backbone, LoginView, HomeView, UserListsView) {

        var MobileRouter = Backbone.Router.extend({

            initialize: function () {

                // Tells Backbone to start watching for hashchange events
                Backbone.history.start();

            },

            // All of your Backbone Routes (add more)
            routes: {

                // When there is no hash on the url, the home method is called
                "": "index",
                "forward/*forwardPath": "forward",
                "back/*backPath": "back",

            },

            index: function () {
                var startView = this.getQueryString('forward');
                if(startView === 'login'){
                    new LoginView();
                } else {
                    // Instantiates a new view which will render the header text to the page
                    new HomeView();
                }
            },

            forward: function (forwardPath) {
                if (forwardPath == 'home') {
                    new HomeView();
                } else if (forwardPath == 'user-list') {
                    new UserListsView()
                }
            },

            // 获取url中的参数
            getQueryString: function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null)return unescape(r[2]);
                return null;
            }

        });

        // Returns the MobileRouter class
        return MobileRouter;

    }
);