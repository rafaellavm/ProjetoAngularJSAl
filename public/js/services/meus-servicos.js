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

})
//serviço que depente de outro serviço
//$q: permite criar promises
	.factory("cadastroDeFotos", function(recursoFoto, $q) {

    var service = {};

    service.cadastrar = function(foto) {
			return $q(function(resolve, reject) {

				if(foto._id) {
					recursoFoto.update({fotoId: foto._id}, foto, function() {
						resolve({
							mensagem: 'Foto ' + foto.titulo + ' atualizada com sucesso',
							inclusao: false
						});
					}, function(erro) {
						console.log(erro);
						reject({
							mensagem: 'Não foi possível atualizar a foto ' + foto.titulo
						});
					});

				} else {
					recursoFoto.save(foto, function() {
						resolve({
							mensagem: 'Foto ' + foto.titulo + ' incluída com sucesso',
							inclusao: true
						});
					}, function(erro) {
						console.log(erro);
						reject({
							mensagem: 'Não foi possível incluir a foto ' + foto.titulo
						});
					});
				}
			});
		};
		return service;
    });
