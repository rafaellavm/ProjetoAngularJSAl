angular.module('alurapic').controller('FotosController', function($scope, $http){

   //o $scope serve para o controller conseguir disponibilizar dados para minha view
   $scope.fotos = [];

   $scope.filtro = '';

   $http.get('v1/fotos')
   .success(function(fotos){

      $scope.fotos = fotos;
   })
   .error(function(erro){
      console.log(erro);
   });
    
    $scope.remover = function(foto){

       $http.delete('v1/fotos/' + foto._id)
       .success(function(){
           console.log('Foto ' + foto.titulo + ' foi removido com sucesso!');
       })
       .error(function(erro){
           console.log(erro);
           console.log('Não foi possível remover a foto ' + foto.titulo);
       });
    };
});
