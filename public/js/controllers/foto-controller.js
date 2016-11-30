angular.module('alurapic').controller('FotoController', function ($scope, $http, $routeParams) {

	$scope.foto = {};
	$scope.mensagem = '';

	//$routeParams: dá acesso aos parâmetros que foram enviados para a rota que estou tentando acessar
    // if($routeParams.fotoId) = 'se foi passado parâmetro na minha rota..."
	if ($routeParams.fotoId) {
		$http.get('/v1/fotos/' + $routeParams.fotoId).success(function (foto) {
			$scope.foto = foto;
		}).error(function (erro) {
			console.log(erro);
			$scope.mensagem = 'Não foi possível obter a foto'
		});
	}

	//método post: para adicionar um registro no back end
	$scope.submeter = function () {
		if ($scope.formulario.$valid) {

			//"se minha foto já tiver id..."
			if ($routeParams.fotoId) {
				//alterar
				$http.put('/v1/fotos/' + $scope.foto._id, $scope.foto).success(function () {
					$scope.mensagem = 'Foto alterada com sucesso';
				}).error(function (erro) {
					console.log(erro);
					$scope.mensagem = 'Não foi possível alterar';
				});

				//$scope.foto._id, $scope.foto = id da foto + os dados da foto
                /*$http.put('v1/fotos/' + $scope.foto._id, $scope.foto)
                .success(function(){
                    $scope.mensagem = "A foto " + $scope.foto.titulo + " foi alterada com sucesso";
                })
                .error(function(erro){
                    $scope.mensagem = "Não foi possível alterar a foto " + $scope.foto.titulo;
                });*/

			}
			else {
				$http.post('/v1/fotos', $scope.foto).success(function () {

					//incluir
					$scope.foto = {};
					$scope.mensagem = 'Foto cadastrada com sucesso';

					 /*$http.post('/v1/fotos', $scope.foto)
                    .success(function () {
                        $scope.foto = {};
                        $scope.mensagem = 'Foto cadastrada com sucesso';
                    })
                    .error(function (erro) {
                        console.log(erro);
                        $scope.mensagem = 'Não foi possível cadastrar a foto';
                    });

                */

				}).error(function (erro) {
					console.log(erro);
					$scope.mensagem = 'Não foi possível cadastrar a foto';
				})
			}
		}
	};
});
