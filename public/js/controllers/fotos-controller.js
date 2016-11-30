angular.module('alurapic').controller('FotosController', function ($scope, recursoFoto) {

   //o $scope serve para o controller conseguir disponibilizar dados para minha view

   $scope.fotos = [];
   $scope.filtro = '';
   $scope.mensagem = '';

   //pra listar todas as fotos do back end
   recursoFoto.query(function(fotos){
      $scope.fotos = fotos;
   },function(erro){
      console.log(erro);
   });

   //$resource substitui o http.get:
   /*$http.get('v1/fotos').success(function (fotos) {
      $scope.fotos = fotos;
   }).error(function (erro) {
      console.log(erro);
   });*/

   $scope.remover = function (foto) {

      recursoFoto.delete({fotoId : foto._id}, function(){

         var indiceFoto = $scope.fotos.indexOf(foto);

         // splice: primeiro argumento: 1) a partir de qual índice vc quer remover?
         // splice: segundo argumento: 2) quantos itens você quer remover?
         $scope.fotos.splice(indiceFoto, 1);

         $scope.mensagem = 'Foto ' + foto.titulo + ' foi removido com sucesso!';

      },function(erro){
          console.log(erro);

         $scope.mensagem = 'Não foi possível remover a foto ' + foto.titulo;
      });

      //$resource substitui o delete:
      /*$http.delete('v1/fotos/' + foto._id).success(function () {

         //depois de remover a foto, pra não ter que fazer mais uma requisição ao servidor com a lista atualizada (com a foto deletada):
         // utilizar um código javascript pra remover o item deletado
         // ele vai percorrer a lista de $scope.fotos e pegar a foto correspondente com índice passado na foto a ser deletada
         var indiceFoto = $scope.fotos.indexOf(foto);

         // splice: primeiro argumento: 1) a partir de qual índice vc quer remover?
         // splice: segundo argumento: 2) quantos itens você quer remover?
         $scope.fotos.splice(indiceFoto, 1);

         $scope.mensagem = 'Foto ' + foto.titulo + ' foi removido com sucesso!';
      }).error(function (erro) {

         console.log(erro);

         $scope.mensagem = 'Não foi possível remover a foto ' + foto.titulo;
      });*/
   };
});
