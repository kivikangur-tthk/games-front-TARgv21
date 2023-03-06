<template>
  <table>
    <tr>
      <th>Name</th>
      <th></th>
    </tr>
    <tr v-for="game in games" :key="game.id">
      <td>{{ game.name }}</td>
      <td>
        <button id="show-details-modal" @click="gameDetailId = game.id">Show Details</button>
        <button id="show-delete-modal" @click="gameDeleteId = game.id">Delete</button>
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
  <Teleport to="body">
    <!-- use the modal component, pass in the prop -->
    <modal :show="gameDeleteId !== 0">
      <template #header>Delete {{ currentGame.name }}
      </template>
      <template #body>
        Are you sure?
      </template>
      <template #footer>
        <div v-if="!error">
          <button class="modal-default-button button-danger" @click="deleteGame">
            Yes
          </button>
          <button class="modal-default-button button-safe" @click="gameDeleteId = 0">
            No
          </button>
        </div>
        <div v-else>
          <span class="text-danger">{{ error }}</span>
          <button class="modal-default-button button-safe" @click="gameDeleteId = 0">
            OK
          </button>          
        </div>
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
  emits: ["deleted"],
  data() {
    return {
      gameDetailId: 0,
      gameDeleteId: 0,
      currentGame: null,
      error: null,
    }
  },
  watch: {
    gameDetailId(newId, oldId) {
      this.currentGame = this.games.find((item) => item.id == newId)
    },
    gameDeleteId(newId, oldId) {
      this.currentGame = this.games.find((item) => item.id == newId)
      this.error = null
    }
  },
  methods: {
    deleteGame() {
      const api_url = import.meta.env.VITE_API_URL
      fetch(`${api_url}/games/${this.gameDeleteId}`, {
          method: "delete",
      })      
      .then( async response => {
        const isJson = response.headers.get("content-type")?.includes("application/json")
        const data = isJson && await response.json()
        if (! response.ok){
          const error = (data && data.error) || response.status
          return Promise.reject(error)
        }
        this.$emit("deleted", this.gameDeleteId)
        this.gameDeleteId = 0

      })
      .catch(error => {
        console.log("Game Delete error: ", error)
        this.error = error
      })      
    }
  },
}
</script>
<style>
table,
th,
td {
  border: 1px solid black;
}
.text-danger {
  color:red;
}
.button-danger {
  background-color: red;
}
.button-safe {
  background-color: green;
}
</style>