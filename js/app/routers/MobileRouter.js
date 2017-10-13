// MobileRouter.js
// ----------------
define(["jquery", "backbone", "app/views/sys/login/login", "app/views/sys/home/home", "app/views/sys/user-list/user-list"],

    function ($, Backbone, LoginView, HomeView, UserListsView) {

        var MobileRouter = Backbone.Router.extend({

            // 保存当前视图
            currentView: null,
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
                // 销毁旧视图
                this.removeView();
                var newView = null;
                if(startView === 'login'){
                    newView =  new LoginView();
                } else {
                    // Instantiates a new view which will render the header text to the page
                    newView = new HomeView();
                }

                this.currentView = newView;
            },

            forward: function (forwardPath) {
                // 销毁旧视图
                this.removeView();
                var newView = null;
                if (forwardPath == 'home') {
                    newView = new HomeView();
                } else if (forwardPath == 'user-list') {
                    newView = new UserListsView();
                }
                this.currentView = newView;
            },

            // 获取url中的参数
            getQueryString: function (name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null)return unescape(r[2]);
                return null;
            },

            // 销毁旧的视图，解除旧视图绑定的事件.
            removeView: function(){
                var oldView = this.currentView;
                if(oldView){
                    oldView.undelegateEvents();
                    oldView.$el.children().remove();
                    oldView.stopListening();
                }
            }
        });

        // Returns the MobileRouter class
        return MobileRouter;

    }
);