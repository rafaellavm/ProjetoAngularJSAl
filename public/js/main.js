//módulo principal da aplicação

angular.module('alurapic',['minhasDiretivas', 'ngAnimate', 'ngRoute','meusServicos'])
.config(function($routeProvider, $locationProvider){

    //assim o angular para de trabalhar com hash e passa a trabalhar com html5, tirando o "#" do link
    //no html é chamado dentro do head <base href="/">
    $locationProvider.html5Mode(true);

    //configuração das rotas
    //vai ser inserida através da <ng-view> dentro do index.html
    //nessa rota aparece a lista de cadastros:
    $routeProvider.when('/fotos',{
        templateUrl: 'partials/principal.html',
        controller: 'FotosController'
    });

    //nessa rota chama a tela de adição da foto
    $routeProvider.when('/fotos/new',{
        templateUrl: 'partials/foto.html',
        controller: 'FotoController'
    });


    //nessa rota chama a tela de edição de foto
    // :fotoId: um 'coringa's
    $routeProvider.when('/fotos/edit/:fotoId',{
        templateUrl: 'partials/foto.html',
        controller: 'FotoController'
    });

    //otherwise: 'caso contrário'... É chamada caso seja digitado uma página que não existe
    $routeProvider.otherwise({
        redirectTo: '/fotos'
    });

});
