app.controller("editUserController", function ($rootScope, $scope, $location, $http) {
    var self = $scope;
    self.accesses = ["Создание депозита", "Закрытие депозита", "Одобрение кредита", "Одобрение открытия счета"];

    var userID = $rootScope.userID;
    if (!userID ) return $location.path('/usersList');

    var loadUserByID = function () {
        $http
            .get('/api/getUserByID/' + userID)
            .then(function (resp) {
                if (resp.status === 200) {
                    self.user = resp.data;
                    console.log(resp.data);
                } else {
                    console.log('err');
                }
            },function (resp) {
                console.log(resp);
            })
    };
    loadUserByID();

    self.setAccess = function (access) {
        if (self.user.accesses.indexOf(access) != -1) {
            self.user.accesses.splice(self.user.accesses.indexOf(access), 1);
        } else {
            self.user.accesses.push(access);
        }
        console.log(self.user.accesses);
    }

    function userClass(name, surname, patronymic, gender, photo, position, subdivision, accesses)
    {
        this.name = name;
        this.surname = surname;
        this.patronymic = patronymic;
        this.gender = gender;
        this.photo = photo;
        this.position = position;
        this.subdivision = subdivision;
        this.accesses = accesses;
    }

    self.updateUser = function () {
        var user = new userClass(self.user.name, self.user.surname, self.user.patronymic, self.user.gender, self.user.photo, self.user.position, self.user.subdivision, self.user.accesses);
        $http
            .put('/api/updateUserByID/' + userID, user)
            .then(function (resp) {
                console.log(resp);
                $location.path('/usersList');
            },function (resp) {
                console.log(resp);
            })
    };

});
