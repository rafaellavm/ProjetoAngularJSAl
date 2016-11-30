angular.module('meusServicos', ['ngResource'])
.factory('recursoFoto', function($resource){

   //factory sempre retorna um objeto javascript com suas funções, propriedades, etc => RETURN

   //$resource ele usa o $http, mas é de mais alto nível.
   //agora o resource que vai acessar o back end
   //criando uma instãncia de $resource
   //null: serve para montar uma querystring ou não (null)
    return $resource('v1/fotos/:fotoId',null,{

      update : {
         method: 'PUT'
      }
   });

});
