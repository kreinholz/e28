<template>
  <div class="WinningMoves">
    <ul>
      <li
        v-for="(move, index) of playerWins"
        :key="index"
      >Player's winning move (# {{ index + 1 }}): {{ move }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    playerWins: Array
  },
  template: "#winning-moves"
};
</script>