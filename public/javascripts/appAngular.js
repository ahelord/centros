angular.module('appTareas', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('registro', {
                url: '/registro',
                templateUrl: 'views/registro_centro.html',
                controller: 'ctrlAlta'
            })
            .state('informacionCentro', {
                url: '/informacion_centro',
                templateUrl: 'views/editar_centro.html',
                controller: 'ctrlEditCent'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'ctrlLogin'
            })
            .state('home', {
                url: '/home',
                templateUrl: 'views/home_user.html',
                controller: 'ctrlHome'
            })
        $urlRouterProvider.otherwise('registro');
    })
    .factory('global',function($http){
        var global = {};
        global.idUser;
        global.idIdentificationTypes = [];
        global.countries = [];
        global.getIdIdentificationTypes = function (){
            return $http.get("identificationtypes").success(function(data){
                angular.copy(data,global.idIdentificationTypes);
            })

        }
       global.getCountries = function (){
            return $http.get("countries").success(function(data){
                angular.copy(data,global.countries);
            })

        }
        return global;
    })
    .controller('ctrlAlta', function($scope,$http,$state,global) {
        $scope.idIdentificationTypes = [];
        $scope.user={};
        function getIdIdentificationTypes(){
            return $http.get("identificationtypes").success(function(data){
                angular.copy(data,$scope.idIdentificationTypes);
            })

        }
        $scope.registrarUsuario = function(){
            return $http.post("user",$scope.user).success(function(data){
                global.idUser = parseInt(data.id_user);
                $state.go("informacionCentro");
            })
        };
        getIdIdentificationTypes();

    })
    .controller('ctrlEditCent',function($scope,$http,$state,global){

        $scope.centro={};
        $scope.centro.idUser = global.idUser;
        global.getIdIdentificationTypes();
        global.getCountries();
        $scope.idIdentificationTypes = global.idIdentificationTypes;
        $scope.countries = global.countries;
        $scope.registrarCentro = function(){

            $http.post("studio",$scope.centro).success(function(data){
                alert('Centro registrado')
            });
        }
    })
    .controller('ctrlLogin',function($scope,$http,$state,global){
        $scope.user = {};
        $scope.err;
        $scope.login = function(){
            //console.log($scope.user);
            $http.post("/login",$scope.user).success(function(data){
                if(data.id_user){
                    global.idUser = parseInt(data.id_user);
                    $scope.err = "Ingreso Correcto";
                    $state.go("home");
                }else
                {
                    $scope.err = "Reviza tu información";
                }
            });
        }
    })
    .controller('ctrlHome',function($scope,$http,$state,global){
        $scope.user = {}
        $scope.user.idUser = global.idUser;

    })

