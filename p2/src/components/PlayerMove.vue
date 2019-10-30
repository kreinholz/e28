<template>
  <div class="PlayerMove">
    <h2>Choose your attack!</h2>
    <p>
      <label>
        <input type="radio" v-model="chosen" value="rock" />💎 Rock
      </label>
    </p>
    <p>
      <label>
        <input type="radio" v-model="chosen" value="paper" />📰 Paper
      </label>
    </p>
    <p>
      <label>
        <input type="radio" v-model="chosen" value="scissors" />✂ Scissors
      </label>
    </p>
    <p>
      <label>
        <input type="radio" v-model="chosen" value="lizard" />🦎 Lizard
      </label>
    </p>
    <p>
      <label>
        <input type="radio" v-model="chosen" value="spock" />🖖 Spock
      </label>
    </p>
    <button @click="$emit('play-match', chosen)">Attack!</button>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      chosen: "spock"
    };
  },
  template: "#player-move"
};
</script>