<template>
    <game-list :games="games" @deleted="removeItem"></game-list>
</template>
<script>
const API_URL = "http://localhost:8080/games"

import gameList from "../components/gameList.vue"

export default {
    components:{
        gameList
    },
    data() {
        return {
            id: 0,
            game: {
                name: "",
                description: "",
                price: 0
            },
            games: []
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        async fetchData() {
            const url = `${API_URL}`
            this.games = await (await fetch(url)).json()
            console.log(this.games)
        },
        removeItem(id) {
            this.games.splice(this.games.map(i => i.id).indexOf(id), 1)
        }
    }
}
</script>