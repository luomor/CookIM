/**
 * Created by cookeem on 16/6/3.
 */
app.controller('changePwdAppCtl', function($rootScope, $scope, $cookies, $timeout, $http) {
    //Hide sidebar when init
    $rootScope.showNavbar = true;
    //Hide footer when init
    $rootScope.showMessageArea = false;
    $timeout(function() {
        showHideSideBar($rootScope.showNavbar);
    }, 0);

    var cookie_userToken = "";
    if ($cookies.get('userToken')) {
        cookie_userToken = $cookies.get('userToken');
    } else {
        Materialize.toast('please login first', 4000);
        window.location.href = '#!/login';
    }
    $scope.changePwdData = {
        "oldPwd": "",
        "newPwd": "",
        "renewPwd": "",
        "userToken": cookie_userToken
    };

    $scope.changePwdSubmit = function() {
        $http({
            method  : 'POST',
            url     : '/api/changePwd',
            data    : $.param($scope.changePwdData),
            headers : { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' }
        }).then(function successCallback(response) {
            console.log(response.data);
            if (response.data.errmsg) {
                $rootScope.errmsg = response.data.errmsg;
                Materialize.toast("error: " + $rootScope.errmsg, 4000);
            } else {
                $rootScope.successmsg = response.data.successmsg;
                Materialize.toast($rootScope.successmsg, 4000);
                window.location.href = '#!/chatlist';
            }
        }, function errorCallback(response) {
            console.info("error:" + response.data);
        });
    };

});