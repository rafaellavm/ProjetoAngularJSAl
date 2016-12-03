angular.module('alurapic')
	.controller('FotoController', function($scope, recursoFoto, $routeParams, cadastroDeFotos) {

	$scope.foto = {};
	$scope.mensagem = '';

	//$routeParams: dá acesso aos parâmetros que foram enviados para a rota que estou tentando acessar
    // if($routeParams.fotoId) = 'se foi passado parâmetro na minha rota..."
	if($routeParams.fotoId) {
			recursoFoto.get({fotoId: $routeParams.fotoId}, function(foto) {
				$scope.foto = foto;
			}, function(erro) {
				console.log(erro);
				$scope.mensagem = 'Não foi possível obter a foto'
			});
		}

		$scope.submeter = function() {

			if ($scope.formulario.$valid) {
				cadastroDeFotos.cadastrar($scope.foto)
				.then(function(dados) {
					$scope.mensagem = dados.mensagem;
					if (dados.inclusao) $scope.foto = {};
				})
				.catch(function(erro) {
					$scope.mensagem = erro.mensagem;
				});
			}
		};
	});
