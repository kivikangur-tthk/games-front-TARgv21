<template>
    <div>
        <h1>Name: {{ currentGame.name }}</h1>
        <p>Description: {{ currentGame.description }}</p>
        <h3>Genre: {{ currentGame.genre }}</h3>
        <h3>Studio: {{ currentGame.studio }}</h3>
        <h3>Release: {{ formatDate(currentGame.release) }}</h3>
    </div>
</template>
<script>
const API_URL = "http://localhost:8080/games"
import useDateFormating from "../composables/useDateFormating.js"

export default {
    props: {
        game: Object,
        required: true
    },
    data() {
        return {
            currentGame: { name: "", description: "", genre: "", studio: "", release: "" }
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        async fetchData() {
            const url = `${API_URL}`
            this.currentGame = await (await fetch(url + "/" + this.game.id)).json()
        },
        formatDate(dateString) {
            return useDateFormating(dateString)
        }
    }
}
</script>