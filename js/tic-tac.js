//put tictactoe game in a function

var tictactoe = (function() {

  //Create variables to track turn count, X/O symbols, current player, board, and board spaces

    var turnCount=0,
        X = 'X',
        O = 'O',
        currentPlayer = X,
        open = '',
        board = [open, open, open, open, open, open, open, open, open, open];

  // display game status

    var displayMessage = function(message) {
        $('.message').html(message);
      };

  //tenary operator to toggle activeUser between O and X, displays current player in HTML message field

    var switchPlayer = function() {
        currentPlayer = ( currentPlayer === X ) ? O : X;
        displayMessage( 'Current Player: ' + currentPlayer );
  };

// will only allow for click events on open board spaces, displays HTML message otherwise

  var isValidMove = function( index ) {
    if ( board[ index ] === open ) {
      return true;
    } else {
      displayMessage( 'That space is already taken!' );
      return false;
    }
  };

  //alters location game symbol is placed based on user input, hides "play again button" 
  //increases turn count with each move

    var makeMove = function( $square, index ) {
      board[ index ] = currentPlayer;
      $square.html( currentPlayer );
      $( '.play-again' ).hide();
      turnCount++;
  };


// Create array of winning index combinations called winning combinations
//set winIndex to -1
//if user does not win returns false, game continues

  var userWins = function() {
    var winCombinations = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], 
                            [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ],
        winIndex = -1;

//run jquery each loop to loop through winning combinations and compare board indexes 
// set winIndex = index
    $.each( winCombinations, function( index, winCombination ) {
      if( allEqual( winCombination ) ){
        winIndex = index;
        return false;
      }
    });

    //if user wins, returns which winCombination led to them winning

    if( winIndex !== -1 ) {
        return winCombinations[ winIndex ];

    // If statement to check 9 moves and set as tie

    } else if ( turnCount === 9 ) {
        return true; 

    //keep playing

    } else {
        return false;
    }
  };

// function to check === consecutive symbols at board indexes and to verify they !== open

    var allEqual = function( indexes ) {
    return ( board[ indexes[0] ] === board[ indexes[1] ] ) &&
           ( board[ indexes[0] ] === board[ indexes[2] ] ) &&
           ( board[ indexes[0] ] !== open );
  };


  //function displays one of two messages
  //if array is returned (winIndex)
  //display currentPlayer as winner/ run showWinFormation function on winIndex
  //otherwise - it's a tie

    var gameOver = function( endFormation ) {
    var resultMessage;

    if( $.isArray(endFormation) ){
      resultMessage = 'Game Over.  Player ' + currentPlayer + ' Wins';
      showWinFormation( endFormation );
    } else {
      resultMessage = 'Game Over.  Draw Game';
    }

    $( '.message' ).addClass( 'end-message' );
    displayMessage( resultMessage );


//turn of gameboard listener to prevent user from clicking after game is over
//display Play Again Button

    $('.gameboard').off('click');
    $( '.play-again' ).show().on( 'click', function() {
        location.reload();
    });

  };

//showWinFormation uses jQuery each loopg
//adds a class of 'winning-square' to each square in the winning array

  var showWinFormation = function( formation ) {
    $.each( formation, function( index, winPosition ) {
      $( '.square' ).eq( winPosition ).addClass(' winning-square ');
    });
  };

  // Main Game Functionality 
    // play 
        //sets index = the square id
        //checks if it's a valid move
        //makes the move
        //if a winning Formation the game is over (tie or winner)
        //otherwise switchs to next players move

  var play = function( $square ) {
    var index = +$square.attr( 'id' );

    if( isValidMove( index ) ){
      makeMove( $square, index );
      var winningFormation = userWins();

      ( winningFormation ) ? gameOver( winningFormation ) : switchPlayer();
    }
  };

//return play

  return { play: play };

})();

// $(document).ready function turns gameboard on
//calls tictactoe.play when gameboard is clicked

$( document ).ready( function() {
  $( '.gameboard' ).on( 'click', '.square', function() {
    tictactoe.play( $(this) );
  });
});
