angular.module('alurapic').controller('FotosController', function($scope, $http){

   //o $scope serve para o controller conseguir disponibilizar dados para minha view
   $scope.fotos = [];

   $scope.filtro = '';

   /*var promise =  $http.get('v1/fotos');

   promise.then(function(retorno){
      $scope.fotos = retorno.data;
   }).catch(function(error){
      console.log(error);
   });*/


   $http.get('v1/fotos')
   .success(function(fotos){

      $scope.fotos = fotos;
   })
   .error(function(erro){
      console.log(erro);
   });
    
});
