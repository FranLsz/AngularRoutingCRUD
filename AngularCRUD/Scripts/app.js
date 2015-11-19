
//MODULE INIT
var app = angular.module("app", ["ngRoute"]);

//MODULE CONFIG
app.config(["$routeProvider", function ($routeProvider) {

    //Routing
    $routeProvider.when("/alumnos", {
        templateUrl: "views/alumno_listado.html",
        controller: "AlumnoListadoCtrl"
    })
    .when("/alumnos/nuevo", {
        templateUrl: "views/alumno_nuevo.html",
        controller: "AlumnoNuevoCtrl"
    })
    .when("/alumnos/:alumnoId", {
        templateUrl: "views/alumno_detalle.html",
        controller: "AlumnoDetalleCtrl"
    })
    .when("/alumnos/:alumnoId/editar", {
        templateUrl: "views/alumno_nuevo.html",
        controller: "AlumnoEditarCtrl"
    })
    .otherwise({
        redirectTo: "/alumnos"
    });

}
]);

//CONTROLLERS
app.controller("MainCtrl", ["$scope", function ($scope) {

    //JSON de alumnos
    $scope.alumnos = [
        {
            id: 0,
            nombre: "Fran",
            apellidos: "López Sánchez",
            edad: 20,
            provincia: "Madrid"
        },
        {
            id: 1,
            nombre: "Andrés",
            apellidos: "Valdés Ramírez",
            edad: 24,
            provincia: "Barcelona"
        },
        {
            id: 2,
            nombre: "Lucía",
            apellidos: "Martín Martín",
            edad: 29,
            provincia: "Toledo"
        },
        {
            id: 3,
            nombre: "Juan",
            apellidos: "Elías Rodríguez",
            edad: 27,
            provincia: "Almería"
        }
    ];

}]);

app.controller("AlumnoListadoCtrl", ["$scope", function ($scope) {

    $scope.label = "Listado de alumnos";

}]);


app.controller("AlumnoNuevoCtrl", ["$scope", "$location", function ($scope, $location) {

    $scope.label = "Creación de un nuevo alumno";
    $scope.btnLabel = "Crear";

    //se establece el ID del alumno 
    $scope.alumno = {
        id: $scope.$parent.alumnos.length
    }

    $scope.submit = function () {
        //se añade el alumno en el JSON de alumnos
        $scope.$parent.alumnos.push($scope.alumno);
        alert("Alumno creado");
        $location.path("/");
    }
}]);



app.controller("AlumnoDetalleCtrl", ["$scope", "$routeParams", "$location", function ($scope, $routeParams, $location) {

    //se recupera el ID de la URL
    var id = $routeParams.alumnoId;

    //y se busca en el JSON de alumnos
    $scope.alumno = $scope.$parent.alumnos[id];

    $scope.go = function (path) {
        $location.path(path);
    };

    $scope.borrar = function (id) {

        if (confirm("¿Está seguro de borrar el alumno con ID " + id + "?")) {
            $scope.$parent.alumnos.splice(id, 1);
            $location.path("/");

        }
    }

}]);

app.controller("AlumnoEditarCtrl", ["$scope", "$location", "$routeParams", function ($scope, $location, $routeParams) {

    $scope.label = "Editar alumno";
    $scope.btnLabel = "Guardar cambios";

    var id = $routeParams.alumnoId;
    //se establece el ID del alumno 
    $scope.alumno = $scope.$parent.alumnos[id];

    $scope.submit = function () {
        //se añade el alumno en el JSON de alumnos
        $scope.$parent.alumnos[id] = $scope.alumno;
        alert("Cambios guardados");
        $location.path("/");
    }
}]);

