angular.module('ravi.controllers', ['ngCordova'])
    .controller('AppCtrl', function ($scope, $cordovaBarcodeScanner, $http, $cordovaSms, $ionicPopup,
                                     $ionicModal, $timeout, $ionicLoading, $cordovaInAppBrowser) {

        $scope.code = "";
        $scope.loadingFlag = false;
        $scope.component = 0;


        $scope.scan = function () {
            $cordovaBarcodeScanner.scan()
                .then(function (result) {
                    var pattern = new RegExp(".*code=\\d{16}");
                    var res = pattern.test(result.text);
                    if (res) {
                        $scope.code = getCodeToUrl(result.text, 'code=');
                    } else {
                        $ionicPopup.alert({
                            title: '<h3>Error</h3>',
                            template: 'Oops! Please scan a valid code.',
                            okType: 'button-balanced'
                        });
                    }
                }, function (error) {
                    $ionicPopup.alert({
                        title: '<h3>Error</h3>',
                        template: 'Oops! Please try again.',
                        okType: 'button-balanced'
                    });
                });
        };


        $scope.checkSms = function () {
            var confirmPopup = $ionicPopup.confirm({
                title: '<h3>Warning</h3>',
                template: 'This is a charged message. Are you sure you want to send it?',
                okText: 'Send',
                okType: 'button-balanced',
                cancelType: 'button-stable'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    var number = "0901296889";
                    var message = "CHECK " + $scope.code;
                    var options = {
                        replaceLineBreaks: false,
                        android: {
                            intent: ''
                        }
                    };
                    var success = function () {
                        $ionicPopup.alert({
                            title: '<h3>Success</h3>',
                            template: 'You sent a message.',
                            okType: 'button-balanced'
                        });
                    };
                    var error = function (e) {
                        $ionicPopup.alert({
                            title: '<h3>Error</h3>',
                            template: 'An error occurred while sent a message.',
                            okType: 'button-balanced'
                        });
                    };

                    $cordovaSms.send(number, message, options, success, error);
                }
            });
        };


        $scope.checkOnline = function () {
            var urlCheckOnline = "http://www.ravi.vn/product/checkcodemobile?code=" + $scope.code.replace(/-/g, '');
            var options = {
                location: 'yes',
                clearcache: 'yes',
                toolbar: 'no'
            };
            $cordovaInAppBrowser.open(urlCheckOnline, '_blank', options)

                .then(function (event) {
                    // success
                })

                .catch(function (event) {
                    // error
                });
        };

        $scope.close = function () {
            $scope.modal.hide();
        };
        $scope.nextComponent = function () {
            $scope.component++;
            $scope.component %= 5;
        };


        $scope.previousComponent = function () {
            $scope.component--;
            if ($scope.component < 0) {
                $scope.component += 5;
            }
        };

        $scope.$on('$destroy', function () {
            $scope.modal.remove();
        });

        function getCodeToUrl(url, patt) {
            var text = url.split(patt);
            var code = text[1];
            code = code.slice(0, 12) + '-' + code.slice(12);
            code = code.slice(0, 8) + '-' + code.slice(8);
            code = code.slice(0, 4) + '-' + code.slice(4);
            return code;
        }

    });
