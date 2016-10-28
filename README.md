CODE OVERVIEW

Create tictactoe

Include:

Create variables to track turn count, X/O symbols, current player, board, and board spaces

Create functions to display message, switch player, verify move is valid, and make move

Prevent user from activating occupied spaces

Create array of winning index combinations called winning combinations, and set winIndex to -1

Iterate each loop to loop through winning combinations and compare board indexes

Set winIndex to winning array

If statement to check 9 moves and set as tie

function to check === consecutive symbols at board indexes and to verify they !== open

function displays one of two messages if array is returned (winIndex) display currentPlayer as winner/ run showWinFormation function on winIndex otherwise - it's a tie


turn of gameboard listener to prevent user from clicking after game is over, and display Play Again Button

showWinFormation adds a class of 'winning-square' to each square in the winning array


Main Game Functionality play sets index = the square id checks if it's a valid move makes the move if a winning Formation the game is over (tie or winner) otherwise switchs to next players move

return play ends loop

$(document).ready function turns gameboard on, and calls tictactoe.play when gameboard is clicked



Primary Game Functionality 
    // play 
        //sets index = the square id
        //checks if it's a valid move
        //makes the move
        //if a winning Formation the game is over (tie or winner)
        //otherwise switchs to next players move

//return play ends loop

On $(document).ready() gameboard on, and calls tictactoe.play when gameboard is clicked

