//variable for function that runs game

var tictactoe = (function() {

  // set variables to track turns, define user symbols, current player, and board position status

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


//jQuery each loop returns compares rows, heights, diagonal to winning combinations
//if user wins, winIndex is set to -1
//if user does not win returns false, winIndex is reset and game continues/

  var userWins = function() {
    var winCombinations = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], 
                            [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ],
        winIndex = -1;
    $.each( winCombinations, function( index, winCombination ) {
      if( allEqual( winCombination ) ){
        winIndex = index;
        return false;
      }
    });

    //if user wins, returns which winCombination led to them winning

    if( winIndex !== -1 ) {
        return winCombinations[ winIndex ];

    //stops game in event of a tie

    } else if ( turnCount === 9 ) {
        return true; 
    } else {
        return false;
    }
  };

  //tracks instances of 3 consecutive symbols (X, O, open by indexes)

    var allEqual = function( indexes ) {
    return ( board[ indexes[0] ] === board[ indexes[1] ] ) &&
           ( board[ indexes[0] ] === board[ indexes[2] ] ) &&
           ( board[ indexes[0] ] !== open );
  };


//After gameOver, function has run will return message with which current Player has Won , or Tie. 
//If a user won, will highlight in green winning combination of moves

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



    // Turn off gameboard click listener/ show play again button

    $('.gameboard').off('click');
    $( '.play-again' ).show().on( 'click', function() {
        location.reload();
    });

  };

  // Add a class to highlight the winning squares green to display to users
  // jquery each loop to add 'winning-square' class to each square part of winning combination

  var showWinFormation = function( formation ) {
    $.each( formation, function( index, winPosition ) {
      $( '.square' ).eq( winPosition ).addClass(' winning-square ');
    });
  };

  // Main game functionality. Adds id to squares that are clicked, verifies movie is validate
  // if a winning Formation appears, user wins , winning formation is displayed, and player is switched

  var play = function( $square ) {
    var index = +$square.attr( 'id' );

    if( isValidMove( index ) ){
      makeMove( $square, index );
      var winningFormation = userWins();

      ( winningFormation ) ? gameOver( winningFormation ) : switchPlayer();
    }
  };

//return play from tictac toe function
  return { play: play };

})();

//loads game into the document window, calls tictactoe.play when a square on game board is clicked

$( document ).ready( function() {
  $( '.gameboard' ).on( 'click', '.square', function() {
    tictactoe.play( $(this) );
  });
});