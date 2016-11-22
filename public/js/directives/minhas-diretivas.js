angular.module('minhasDiretivas',[])
.directive('meuPainel',function(){
    
    var ddo = {};
    
    //diretiva de atributo e de elemento
    ddo.restrict = "AE";
    
    //escopo privado da diretiva, pra ela ficar isolada
    //não é o mesmo scope do controller, ele é só da diretiva
    //titulo: é passado como parâmetro
    //<meu-painel titulo="titulo"></meu-painel>
    ddo.scope = {
        
        //'@titulo' //quando é o mesmo nome (propriedade e atributo pode só colocar o @)
        titulo: '@' 
    };
    
    //diretiva que tem elementos filhos e você quer manter esses elementos
    //pra isso se usa o transclude
    //no caso é a imagem dentro do panel:
    //<meu-painel ng-repeat="foto in fotos" titulo="{{foto.titulo}}">
    //  <img src="{{foto.url}}"  alt="{{foto.titulo}}" class="img-responsive center-block"/>
    //  </meu-painel>
    //no ddo.template coloca centro da class 'panel-body' a tag ng-transclude

    ddo.transclude = true;
    
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
    
}).directive('minhaFoto', function(){

    var ddo = {};

    ddo.restrict = 'AE';

    ddo.scope = {

        titulo: '@',
        url: '@'
    };

    ddo.template = '<img class="img-responsive center-block" src="{{url}}" titulo="{{titulo}}" />';
    
});






















