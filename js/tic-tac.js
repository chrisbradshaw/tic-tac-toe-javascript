$(document).ready(function(){

  // set variable to track turns

    var turnCount=0;

  // display who's turn it is

    var displayCurrentPlayer = function(currentPlayer) {
        $('.currentPlayer').html(currentPlayer);
      };

  // display player's tile symbol on spot they clicked, even turns X, odds O
  // check if either player has won


      $('#board').find('td').on('click', function(){

        //check for tie

          if (turnCount === 9) {
              alert("Game over! It's a tie!");
              $(this).text('X');
              $('#newGame').removeClass('invisible');
              console.log(turnCount);
          } else {

        //check if turn count is an even integer - if so, it's Player X's turn
    
            if (turnCount % 2 === 0){
              displayCurrentPlayer( 'Current Player: O');
              $(this).text('X'); 
              checkForWin('X');
              console.log(turnCount);
            } else {

        //otherwise - it's Player Os turn

              displayCurrentPlayer( 'Current Player: X');
              $(this).text('O');
              checkForWin('O');
              console.log(turnCount);
            }
            turnCount++;
              };
      });

 console.log(turnCount);

     //if number of turns is greater than spaces = it's a tie
     //if click the same spot twice, no change

    // Function to check each row, column and diagonal for 3 consecutive Xs or Os, if so - display "new game button" 
     
    
    function checkForWin(player){
       //top row check
        if ($('#board').find('#1').text() !== ''){
            if ($('#board').find('#1').text() == $('#board').find('#2').text()) {
                if ($('#board').find('#1').text() == $('#3').text()) {
                    alert('Game over! '+player+' is the winner!');
                    $('#newGame').removeClass('invisible');
                }
            }
        //left column check
            if ($('#board').find('#1').text() == $('#board').find('#4').text()) {
                if ($('#board').find('#1').text() == $('#7').text()) {
                    alert('Game over! '+player+' is the winner!');
                    $('#newGame').removeClass('invisible');
                }
            }
        //left diagonal check
            if ($('#board').find('#1').text() == $('#board').find('#5').text()) {
                if ($('#board').find('#1').text() == $('#9').text()) {
                    alert('Game over! '+player+' is the winner!');
                    $('#newGame').removeClass('invisible');
                }
            }    
        }
        
       //middle column check
        if ($('#board').find('#2').text() !== ''){
            if ($('#board').find('#2').text() == $('#board').find('#5').text()) {
                if ($('#board').find('#2').text() == $('#8').text()) {
                    alert('Game over! '+player+' is the winner!');
                    $('#newGame').removeClass('invisible');
                }
            }
        }
        
        //right column check
        if ($('#board').find('#3').text() !== ''){
            if ($('#board').find('#3').text() == $('#board').find('#6').text()) {
                if ($('#board').find('#3').text() == $('#9').text()) {
                    alert('Game over! '+player+' is the winner!');
                    $('#newGame').removeClass('invisible');
                }
            }
            //right diag check
            if ($('#board').find('#3').text() == $('#board').find('#5').text()) {
                if ($('#board').find('#3').text() == $('#7').text()) {
                    alert('Game over! '+player+' is the winner!');
                    $('#newGame').removeClass('invisible');
                }
            }
        }
        
        //middle row check
        
        if ($('#board').find('#4').text() !== ''){
            if ($('#board').find('#4').text() == $('#board').find('#5').text()) {
                if ($('#board').find('#4').text() == $('#6').text()) {
                    alert('Game over! '+player+' is the winner!');
                    $('#newGame').removeClass('invisible');
                }
            }
        }
        
        //bottom row check
        if ($('#board').find('#7').text() !== ''){
            if ($('#board').find('#7').text() == $('#board').find('#8').text()) {
                if ($('#board').find('#7').text() == $('#9').text()) {
                    alert('Game over! '+player+' is the winner!');
                    $('#newGame').removeClass('invisible');
                }
            }
        }     
    }

// Play again, reset turn count, reset player turn to player X

    $('#newGame').on('click',function(){
        $('.square').text('');
        turnCount = 0;
        displayCurrentPlayer( 'Current Player: X');
    });

});
