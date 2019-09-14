'use strict';

// Don't run until the page is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Grab our DOM elements we want to work with
    const playerButton = document.getElementById('commit');
    let result = document.getElementById('matchResult');
    let compMove = document.getElementById('rpslsCompChoice');
    let wonMsg = document.getElementById('won');
    let lostMsg = document.getElementById('lost');
    let tieMsg = document.getElementById('tie');

    // Add an event listener to the player's Attack button
    playerButton.addEventListener('click', match);

    function match() {
        // Define a placeholder for win/lose/draw
        let winner = '';
        // Determine which attack the player chose
        const playerAttack = document.querySelector('input[name="choice"]:checked').value;

        // Define an array containing the computer's 5 attacks
        const compAttacks = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
        // Define an array containing the unicode symbols corresponding to the 5 attacks
        const unicodeCompAttacks = ['💎', '📰', '✂', '🦎', '🖖'];
        // Generate a random integer to use as the index of the computer's attack array
        let randomIndex = Math.floor(Math.random() * Math.floor(5));
        // Choose the computer's attack by using the random integer to index the attack array
        let compAttack = compAttacks[randomIndex];
        let unicodeCompAttack = unicodeCompAttacks[randomIndex];

        // Display the computer's move to the player
        compMove.innerHTML = unicodeCompAttack + ' ' + compAttack;
        // Unhide the matchResult container div, after hiding it for a 1/10 second
        // See https://github.com/susanBuck/e28/blob/master/game/script.js, lines 29-32
        result.style.display = 'none';
        setTimeout(function () {
            result.style.display = 'block';
        }, 100);

        /* The following conditionals illustrate when vanilla JavaScript stops being fun.
        I split what could've been one very complex conditional into 5 separate ones for
        code readability purposes */

        // Define a tie
        if (playerAttack === compAttack) {
            winner = 'tie';
        }
        // Define a player victory - rock
        else if (playerAttack == 'rock' && ((compAttack == 'scissors') || (compAttack == 'lizard'))) {
            winner = 'player';
        }
        // Define a player victory - paper
        else if (playerAttack == 'paper' && ((compAttack == 'rock') || (compAttack == 'spock'))) {
            winner = 'player';
        }
        // Define a player victory - scissors
        else if (playerAttack == 'scissors' && ((compAttack == 'paper') || (compAttack == 'lizard'))) {
            winner = 'player';
        }
        // Define a player victory - lizard
        else if (playerAttack == 'lizard' && ((compAttack == 'paper') || (compAttack == 'spock'))) {
            winner = 'player';
        }
        // Define a player victory - spock
        else if (playerAttack == 'spock' && ((compAttack == 'rock') || (compAttack == 'scissors'))) {
            winner = 'player';
        }
        // If none of the above conditions is met, the computer won
        else {
            winner = 'computer';
        }

        // Let the player know the result of the match
        if (winner == 'player') {
            wonMsg.style.display = 'block';
            lostMsg.style.display = 'none';
            tieMsg.style.display = 'none';
        }
        else if (winner == 'computer') {
            wonMsg.style.display = 'none';
            tieMsg.style.display = 'none';
            lostMsg.style.display = 'block';
        }
        else {
            wonMsg.style.display = 'none';
            lostMsg.style.display = 'none';
            tieMsg.style.display = 'block';
        }
    }

});