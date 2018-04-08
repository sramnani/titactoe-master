var app = angular.module('tictactoeApp', []);

app.config(function($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'partials/tictactoe.html',
            controller: 'ticTacController'
        }).
        otherwise({
            redirectTo: '/'
    });
});

app.constant('board_size', 3);

app.factory('ticTacToe', function(){
	return new ticTacToe();
})