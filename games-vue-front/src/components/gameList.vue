<template>
    <table>
        <tr>
            <th>Name</th>
            <th></th>
        </tr>
        <tr v-for="game in games" :key="game.id">
            <td>{{ game.name }}</td>
            <td>  
                <button id="show-modal" @click="gameDetailId = game.id">Show Details</button>                
            </td>
        </tr>
    </table>
    <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="gameDetailId !== 0" @close="gameDetailId = 0">
      <template #header>{{ currentGame.name }}
      </template>
      <template #body>
        <GameDetails :game="currentGame"></GameDetails>
      </template>    
    </modal>
  </Teleport>
</template>
<script>
import GameDetails from "./gameDetails.vue"
import Modal from "./modal.vue"
export default {
    components: {
        Modal,
        GameDetails
    },
    props: {
        games: Array,
        required: true
    },
    data() {
        return {
            gameDetailId: 0,
            currentGame: null
        }
    },    
    watch: {
        gameDetailId(newId, oldID) {
            this.currentGame = this.games.find((item)=> item.id == newId)
        }
    }
}
</script>
<style>
table,
th,
td {
    border: 1px solid black;
}
</style>