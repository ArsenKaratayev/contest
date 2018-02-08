app.controller("addUserController", function ($scope, $http, $location) {
	self = $scope;
	self.accesses = ["Создание депозита", "Закрытие депозита", "Одобрение кредита", "Одобрение открытия счета"];
	self.userAccesses = [];
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

	self.setAccess = function (access) {
		if (self.userAccesses.indexOf(access) != -1) {
			self.userAccesses.splice(self.userAccesses.indexOf(access), 1);
		} else {
			self.userAccesses.push(access);
		}
		console.log(self.userAccesses);
	}

	self.sendUser = function () {
		var user = new userClass(self.name, self.surname, self.patronymic, self.gender, self.photo, self.position, self.subdivision, self.userAccesses);
		$http
			.post('http://localhost:4000/api/addUser', user)
			.then(function (response) {
				if (response.status === 201) {
					self.name = "";
					self.surname = "";
					self.patronymic = "";
					self.photo = "";
					self.userAccesses = [];
					$location.path('/usersList');
				} else {
					alert("error");
				}
				console.log(response);
			},function (response) {
				alert("error...")
			});
	}
})