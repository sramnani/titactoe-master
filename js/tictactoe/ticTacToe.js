//Function to handle the game functionality
'use strict';

var ticTacToe = function(params){
	// default values
	this.computer_first = false;
	this.grid = 3;
	this.board = null;

	// players
	this.manual_player = new Player('o', false);
	this.computer_player = new Player('x', true);
	this.current_player = this.manual_player;

	// results
	this.winner = null;
	this.tie = false;
	this.winning_combo = [];
}

ticTacToe.prototype = {
	start: function(grid, computer_first){
		this.grid = grid;
		this.computer_first = computer_first;
		this.board = new Board(this.grid);
		this.current_player = this.manual_player;
		this.winner = null;
		this.tie = false;
		this.winning_combo = [];

		if(this.computer_first){
			this.current_player = this.computer_player;
			this.computer_move();
		}
	},
	move: function(index){
		if(this.board.canMove(index)){
			this.board.move(index, this.current_player);
			this.current_player = this.current_player.is_computer ? this.manual_player : this.computer_player;
			this.checkWinner();
			if(!this.winner){
				if(this.current_player.is_computer){
					this.ai_move();
				}
				this.checkWinner(); 
				if((!this.winner)&&(this.board.isComplete())){
					this.tie = true;
				} 
			} 
		}
	},
	checkWinner:function(){
		var winner = this.board.checkWinner();
		if(typeof winner !== "undefined"){
			this.winner = winner;
		}
	},
	ai_move:function(){
		var next_move = this.board.compute_next_move();
		if(typeof next_move === "undefined") {
			this.tie = true;
		} else {
			this.board.move(next_move, this.current_player);
			this.current_player = this.current_player.is_computer ? this.manual_player : this.computer_player;
		}
	}
};