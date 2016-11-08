angular.module('alurapic').controller('FotosController', function($scope){
    
     //o $scope serve para o controller conseguir disponibilizar dados para minha view
     $scope.foto = {
        titulo: "Leão",
        url: "http://www.fundosanimais.com/Minis/leoes.jpg"
    };
    
});