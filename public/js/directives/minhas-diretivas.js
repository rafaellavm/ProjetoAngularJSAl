angular.module('minhasDiretivas', ['meusServicos']).directive('meuPainel', function () {
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
        //Usamos @ quando queremos realizar uma cópia do valor passado para a diretiva no HTML para dentro do escopo isolado na diretiva. Essa cópia é sempre um valor em string.
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

}).directive('minhaFoto', function () {

    var ddo = {};

        ddo.restrict = "AE";

        ddo.scope = {
            titulo: '@'
            , url: '@'
        };

        ddo.template = '<img class="img-responsive center-block" src="{{url}}" alt="{{titulo}}">';

        return ddo;

}).directive('meuBotaoPerigo', function () {

    var ddo = {};

    //só pode ser usado como elemento
        ddo.restrict = "E";

    //escopo da diretiva com seus atributos
        ddo.scope = {
            //string
            nome: '@'
            , //é passado uma expressão, não uma string, por isso o &
            acao: '&'
        };

    //botão chamado na página principal.html, para remover a foto
        ddo.template = '<button ng-click="acao(foto)" class="btn btn-danger btn-block">{{nome}}</button>';

        return ddo;

}).directive('meuFocus', function () {

    var ddo = {};

        //essa diretiva só funciona como atributo
        //<a href="/" class="btn btn-primary" meu-focus focado="focado">Voltar</a>
        ddo.restrict = "A";

        // Esse '=' permite que qualquer alteração que a diretiva faça na propriedade o meu controle fica 'sabendo', e vice-versa
        // é uma comunicação bi-direcional
        //(não precisa mais)
        /*ddo.scope = {

            focado: '='
        };*/

        //link: dá acesso ao escopo da minha diretiva; também tem acesso ao elemento do dom que eu quero trabalhar
        //só na fase link eu posso botar 'watchers' (observadores de propriedades)
        //link recebe uma função. Nessa função eu tenho acesso ao escopo da minha diretiva, e ao elemento
        //element: elemento do dom no qual a diretiva foi adicionada
        //assim eu tenho acesso a 'focado', vou saber se ele é verdadeiro ou falso e ele me dá acesso também ao elemento do dom a qual ele faz parte
        //eu só quero executar essa diretiva quando a propriedade foco mudar
        ddo.link = function (scope, element) {
            //1)
            /*//focado: propriedade que eu quero monitorar
            //watch:  fica monitorando o elemento
            scope.$watch('focado',function(){

                //scope.focado = tenho acesso ao escopo
                //se o escopo focado for verdadeiro...
                if(scope.focado){

                    element[0].focus();
              }*/
            //2) outra forma de fazer sem usar o $watch (que pode ser custoso e deixar a página lenta):
            //$on fica monitorando o evento 'fotoCadastrada', se ela foi disparada eu posso fazer uma ação:

            scope.$on('fotoCadastrada', function () {
                element[0].focus();
            });
        }

        return ddo;
})
//Essa diretiva buscará fotos do servidor e montará uma lista com apenas os títulos dessas fotos.
.directive('meusTitulos', function () {

    var ddo = {};

    //diretiva de elemento

    ddo.restrict = 'E';

    ddo.template = '<ul><li ng-repeat="titulo in titulos">{{titulo}}</li></ul>';

    //precisaremos de recursoFoto
        //A solução mora na propriedade controller do nosso ddo
        //A propriedade controller permite passarmos uma função que permite termos acesso aos injetáveis do Angular, como $scope e 'recursoFoto'
        //dúvida: como recursoFoto foi injetado se não temos o módulo 'meusServicos' como dependência de minhasDiretivas?
        //resposta: nosso módulo principal da aplicação já carrega o módulo 'meusServicos', inclusive o módulo 'minhasDiretivas', por isso 'recursoFoto' é injetável (mas vamos declará-lo mesmo assim)
        //Agora, basta buscarmos nossas fotos e adicionarmos o resultado em $scope.titulos
        ddo.controller = function ($scope, recursoFoto) {

            recursoFoto.query(function(fotos){
                //vamos usar a função map do javscript:
                //A função map itera sobre nossa lista fornecendo acesso ao elemento da iteração no seu parâmetro. Poderia ser qualquer nome, mas nada mais justo chamarmos de foto, já que estamos iterando sobre uma lista de fotos. Para cada foto retornamos seu titulo, isto é, no final da iteração teremos uma nova lista, mas de títulos apenas.
                $scope.titulos = fotos.map(function(foto){
                    return foto.titulo;
                });
            });
        };

    return ddo;

});


