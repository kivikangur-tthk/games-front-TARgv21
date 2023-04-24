<template>
    <div>
        <h1>Name: {{ currentPlayer.firstName }} {{ currentPlayer.lastName }}</h1>
        
        <h3>
        <a v-if="currentPlayer.GamePlays?.length > 0" :href="gameplays_link">Gameplays</a>
        <span v-else>Has not played any games yet.</span>
        </h3>
        <!-- <h3>Studio: {{ currentPlayer.studio }}</h3> -->
    </div>
</template>
<script>
const API_URL = "http://localhost:8080/players"
import useDateFormating from "../composables/useDateFormating.js"

export default {
    props: {
        player: {
            type:Object,
            required: true
        },
        gameplays_link : {
            type: String
        }
    },
    data() {
        return {
            currentPlayer: { firstName: "", lastName: "", GamePlays: [] }
        }
    },
    async mounted() {
        await this.fetchData()
    },
    methods: {
        async fetchData() {
            const url = `${API_URL}`
            this.currentPlayer = await (await fetch(url + "/" + this.player.id)).json()
        },
        formatDate(dateString) {
            return useDateFormating(dateString)
        }
    }
}
</script>