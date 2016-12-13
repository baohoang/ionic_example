angular.module('ravi', ['ionic','ionic.service.core', 'ngCordova', 'ravi.controllers', 'ionic-ajax-interceptor'])

    .run(function ($ionicPlatform, AjaxInterceptor) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });

        AjaxInterceptor.run();
    });
