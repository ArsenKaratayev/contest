app.controller("usersListController" , function ($scope, $http, $rootScope, $location) {
    var self = $scope;
    self.showPhoto = 'f';
    self.visiblePhoto = "";
    self.name = "";
    self.surname = "";
    self.patronymic = "";
    self.gender = "";
    self.position = "";
    self.subdivision = "";

    self.load = function () {
        $http
            .get('http://localhost:4000/api/getUsers')
            .then(function (response) {
                if (response.status === 200) {
                    self.users = response.data.slice();
                }
            },
            function (response) {
                alert(response);
            }
        );

    };
    self.load();

    self.filter = function() {
        var filterUsers = [];
        var bname = true; 
        var bsurname = true;
        var bpatronymic = true;
        var bgender = true;
        var bposition = true;
        var bsubdivision = true;
        for (var i = 0; i < self.users.length; i++) {
            if (self.name != "") {
                if (self.users[i].name != self.name) {
                    bname = false;
                }
            }
            if (self.surname != "") {
                if (self.users[i].surname != self.surname) {
                    bsurname = false;
                }
            }
            if (self.patronymic != "") {
                if (self.users[i].patronymic != self.patronymic) {
                    bpatronymic = false;
                }
            }
            if (self.gender != "") {
                if (self.users[i].gender != self.gender) {
                    bgender = false;
                }
            }
            if (self.position != "") {
                if (self.users[i].position != self.position) {
                    bposition = false;
                }
            }
            if (self.subdivision != "") {
                if (self.users[i].subdivision != self.subdivision) {
                    bsubdivision = false;
                }
            }
            if (bname && bsurname && bpatronymic && bgender && bposition && bsubdivision) {
                filterUsers.push(self.users[i])
            }
        }
        console.log(bname, bsurname, bpatronymic, bgender, bposition, bsubdivision)
        self.users = filterUsers;
    }

    self.updateUser = function(userID) {
        $location.path('editUser');
        $rootScope.userID = userID;
    }

    self.deleteUser = function(userID) {
        $http
            .delete('/api/deleteUser/' + userID)
            .then(function (resp) {
                if (resp.status === 200) {
                self.load();
                }
            },function (resp) {
                alert("ERROR!");
            });
    }

    self.getPhoto = function(src) {
        self.showPhoto = 't';
        self.visiblePhoto = src;
    }
    self.rePhoto = function() {
        self.showPhoto = 'f';
    }
})