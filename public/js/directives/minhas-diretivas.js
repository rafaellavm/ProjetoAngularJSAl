angular.module('minhasDiretivas', [])
	.directive('meuPainel', function() {

		var ddo = {};
    
        //diretiva de atributo e de elemento
        ddo.restrict = "AE";
    
     //diretiva que tem elementos filhos e você quer manter esses elementos
    //pra isso se usa o transclude
    //no caso é a imagem dentro do panel:
    //<meu-painel ng-repeat="foto in fotos" titulo="{{foto.titulo}}">
    //  <img src="{{foto.url}}"  alt="{{foto.titulo}}" class="img-responsive center-block"/>
    //  </meu-painel>
    //no ddo.template coloca centro da class 'panel-body' a tag ng-transclude
        ddo.transclude = true;

        //escopo privado da diretiva, pra ela ficar isolada
        //não é o mesmo scope do controller, ele é só da diretiva
        //titulo: é passado como parâmetro
        //<meu-painel titulo="titulo"></meu-painel>

        ddo.scope = {
            //'@titulo' //quando é o mesmo nome (propriedade e atributo pode só colocar o @)
            titulo: '@'
        };
    
        //template da diretiva
        /*ddo.template = '<div class="panel panel-default">'
               +         '<div class="panel panel-heading">'
               +             '<h3 class="panel-title text-center">{{titulo}}</h3>'
               +         '</div>'
               +         '<div class="panel-body" ng-transclude>'
               +         '</div>'
               +   '</div>';*/

        ddo.templateUrl = 'js/directives/meu-painel.html';

		return ddo;
    })
.directive('minhaFoto', function() {

        var ddo = {};

        ddo.restrict = "AE";

        ddo.scope = {
            titulo: '@',
            url: '@'
        };

        ddo.template = '<img class="img-responsive center-block" src="{{url}}" alt="{{titulo}}">';

        return ddo;
    })
.directive('meuBotaoPerigo', function(){

    var ddo = {};

    //só pode ser usado como elemento
    ddo.restrict = "E";

    //escopo da diretiva com seus atributos
    ddo.scope = {

        //string
        nome: '@',
        //é passado uma expressão, não uma string, por isso o &
        acao: '&'
    };

    //botão chamado na página principal.html, para remover a foto
    ddo.template = '<button ng-click="acao(foto)" class="btn btn-danger btn-block">{{nome}}</button>';

    return ddo;

});



















