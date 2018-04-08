'use strict';
//Controller to initialize the board and interact with the html/css
function ticTacController($scope, ticTacToe,board_size) {
    $scope.grid = new Array(board_size);
    $scope.status_message = "";
    $scope.computer_first = false;
    $scope.game_over = false;

    $scope.startTicTacToe = function(){
        $scope.status_message = "";
        $scope.game_over = false;
        ticTacToe.start($scope.grid.length, $scope.computer_first);
        $scope.status_message = "";
    }

    $scope.nextMove = function(col, row){
        var boardPos,symbol, winner;
        boardPos = getBoardPos(col,row);
        if(ticTacToe.board && ticTacToe.board.canMove(boardPos) && !ticTacToe.winner && !ticTacToe.tie){
            // make move
            ticTacToe.move(boardPos);

            // check winner
            if(ticTacToe.winner) {
                if(ticTacToe.winner === ticTacToe.board.X) $scope.status_message = "You lost Computer won!";
                if(ticTacToe.winner === ticTacToe.board.O) $scope.status_message = "Congratulations you won!";
                $scope.game_over = true;
            }

            // check tie
            if(ticTacToe.tie){
                $scope.status_message = "Tie! no one wins!";
                $scope.game_over = true;
            }
        }
    }

    $scope.getSquareSymbol = function(col, row){
        return ticTacToe.board ? ticTacToe.board.renderSquare(getBoardPos(col,row)) : "--";
    }

    $scope.isWinner = function(col, row){
        var boardPos;
        if(ticTacToe.board && ticTacToe.winner && ticTacToe.board.winning_combo){
            boardPos = getBoardPos(col,row);
            return ticTacToe.board.winning_combo.indexOf(boardPos) > -1;
        }
        return false;
    }

    function getBoardPos(col,row){
        return (row * board_size) + col;
    }
}
