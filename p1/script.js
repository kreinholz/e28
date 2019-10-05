'use strict';

let app = new Vue({
    el: '#app',
    data: {
        'showDiagram': true,
        'compAttacks': ['rock', 'paper', 'scissors', 'lizard', 'spock'],
        'unicodeCompAttacks': ['💎', '📰', '✂', '🦎', '🖖'],
        'chosen': 'spock',
        'compChoice': '',
        'winner': '',
        'playerWins': [],
        'computerWins': []
    },
    methods: {
        match: function () {
            // Generate a random integer to use as the index of the computer's attack array
            let compAttackIndex = Math.floor(Math.random() * Math.floor(5));
            // Choose the computer's attack by using the random integer to index the attack array
            let compAttack = this.compAttacks[compAttackIndex];
            // Set the value of compChoice to the compAttack that was just randomly generated
            this.compChoice = compAttack;
            // Define a tie and pass it back to our app data
            if (this.chosen === compAttack) {
                this.winner = 'tie';
            }
            // Define a player victory - rock
            else if (this.chosen == 'rock' && ((compAttack == 'scissors') || (compAttack == 'lizard'))) {
                this.winner = 'player';
                // push the winning move to the playerWins array
                this.playerWins.push('💎');
            }
            // Define a player victory - paper
            else if (this.chosen == 'paper' && ((compAttack == 'rock') || (compAttack == 'spock'))) {
                this.winner = 'player';
                // push the winning move to the playerWins array
                this.playerWins.push('📰');
            }
            // Define a player victory - scissors
            else if (this.chosen == 'scissors' && ((compAttack == 'paper') || (compAttack == 'lizard'))) {
                this.winner = 'player';
                // push the winning move to the playerWins array
                this.playerWins.push('✂');
            }
            // Define a player victory - lizard
            else if (this.chosen == 'lizard' && ((compAttack == 'paper') || (compAttack == 'spock'))) {
                this.winner = 'player';
                // push the winning move to the playerWins array
                this.playerWins.push('🦎');
            }
            // Define a player victory - spock
            else if (this.chosen == 'spock' && ((compAttack == 'rock') || (compAttack == 'scissors'))) {
                this.winner = 'player';
                // push the winning move to the playerWins array
                this.playerWins.push('🖖');
            }
            // If none of the above conditions is met, the computer won
            else {
                this.winner = 'computer';
                // push the winning move to the computerWins array
                this.computerWins.push(compAttack);
            }
        }
    }
});