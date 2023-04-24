<template>
    <table-view caption="Kõik mängijad" :items="players" :showControls="true" @show="playerDetailId = $event.id">
    </table-view>
    <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <modal :show="playerDetailId !== 0" @close="playerDetailId = 0">
            <template #header>{{ currentPlayer.firstName }}
            </template>
            <template #body>
                <PlayerDetails :player="currentPlayer" :gameplays_link="`/usergames/${currentPlayer.id}`"></PlayerDetails>
            </template>
        </modal>
    </Teleport>
</template>
<script>
import TableView from "../components/tableView.vue"
import PlayerDetails from '../components/playerDetails.vue';
import Modal from "../components/modal.vue"

export default {
    components: {
        TableView,
        PlayerDetails,
        Modal
    },
    data() {
        return {
            players: [],
            playerDetailId: 0,
            currentPlayer: { id: "", firstName: "", lastName: "" },
        }
    },
    async created() {
        this.players = await (await fetch("http://localhost:8080/players")).json();
    },
    watch: {
        playerDetailId(newId, oldId) {
            this.currentPlayer = this.players.find((item) => item.id == newId)
        },
    }
}

</script>
<style></style>