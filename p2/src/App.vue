<template>
  <div id="app" v-cloak>
    <input type="checkbox" id="showDiagram" v-model="showDiagram" />
    <label for="showDiagram">Show/hide diagram of moves/outcomes.</label>
    <div v-if="showDiagram">
      <p>Here is a diagram of what beats what:</p>
      <p>
        <img src="./assets/rpsls.png" alt="Rock-Paper-Scissors-Lizard-Spock-Diagram" />
      </p>
      <p>Got it? Good. Let's play!</p>
    </div>
    <player-move @play-match="updateMove($event)"></player-move>
    <div v-show="compChoice">
      <div v-show="chosen">Player chose: {{ chosen }}</div>
      <div>Computer chose: {{ compChoice }}</div>
      <div v-if="winner == 'player'" id="won">You won!</div>
      <div v-else-if="winner == 'tie'">It's a draw!</div>
      <div v-else id="lost">You lost.</div>
    </div>
    <div v-if="playerWins.length > 0 || computerWins.length > 0">
      <h3>Won/Loss Record:</h3>
      <p>Player Wins: {{ playerWins.length }} | Computer Wins: {{ computerWins.length }}</p>
      <p>
        Your
        <span v-if="playerWins">{{ playerWins.length }}</span> winning
        <span v-if="playerWins.length == 1">move:</span>
        <span v-if="playerWins.length > 1">moves:</span>
      </p>
      <winning-moves :playerWins="playerWins"></winning-moves>
    </div>
  </div>
</template>

<script>
import PlayerMove from "./components/PlayerMove.vue";
import WinningMoves from "./components/WinningMoves.vue";

export default {
  name: "app",
  components: {
    PlayerMove,
    WinningMoves
  },
  data: function() {
    return {
      showDiagram: true,
      compAttacks: ["rock", "paper", "scissors", "lizard", "spock"],
      unicodeCompAttacks: ["💎", "📰", "✂", "🦎", "🖖"],
      compChoice: "",
      chosen: "spock",
      winner: "",
      playerWins: [],
      computerWins: []
    };
  },
  methods: {
    updateMove: function(chosen) {
      this.chosen = chosen;
      this.playMatch();
    },
    playMatch: function() {
      // Generate a random integer to use as the index of the computer's attack array
      let compAttackIndex = Math.floor(Math.random() * Math.floor(5));
      // Choose the computer's attack by using the random integer to index the attack array
      let compAttack = this.compAttacks[compAttackIndex];
      // Set the value of compChoice to the compAttack that was just randomly generated
      this.compChoice = compAttack;
      // Define a tie and pass it back to our app data
      if (this.chosen === compAttack) {
        this.winner = "tie";
      }
      // Define a player victory - rock
      else if (
        this.chosen == "rock" &&
        (compAttack == "scissors" || compAttack == "lizard")
      ) {
        this.winner = "player";
        // push the winning move to the playerWins array
        this.playerWins.push("💎");
      }
      // Define a player victory - paper
      else if (
        this.chosen == "paper" &&
        (compAttack == "rock" || compAttack == "spock")
      ) {
        this.winner = "player";
        // push the winning move to the playerWins array
        this.playerWins.push("📰");
      }
      // Define a player victory - scissors
      else if (
        this.chosen == "scissors" &&
        (compAttack == "paper" || compAttack == "lizard")
      ) {
        this.winner = "player";
        // push the winning move to the playerWins array
        this.playerWins.push("✂");
      }
      // Define a player victory - lizard
      else if (
        this.chosen == "lizard" &&
        (compAttack == "paper" || compAttack == "spock")
      ) {
        this.winner = "player";
        // push the winning move to the playerWins array
        this.playerWins.push("🦎");
      }
      // Define a player victory - spock
      else if (
        this.chosen == "spock" &&
        (compAttack == "rock" || compAttack == "scissors")
      ) {
        this.winner = "player";
        // push the winning move to the playerWins array
        this.playerWins.push("🖖");
      }
      // If none of the above conditions is met, the computer won
      else {
        this.winner = "computer";
        // push the winning move to the computerWins array
        this.computerWins.push(compAttack);
      }
    }
  }
};
</script>

<style>
#won {
  color: green;
}

#lost {
  color: red;
}

[v-cloak] {
  display: none;
}
</style>
