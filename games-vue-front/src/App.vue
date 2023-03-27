<template>
    <!-- <game-details :game="game"></game-details> -->
    <!-- <game-list :games="games" @deleted="removeItem"></game-list> -->
    <user-games :playerId="playerId"></user-games>
</template>
<script>
const API_URL = "http://localhost:8080/games"

import gameDetails from "./components/gameDetails.vue"
import gameList from "./components/gameList.vue"
import userGames from "./components/userGames.vue"

export default {
    components:{
        gameDetails,
        gameList,
        userGames
    },
    data() {
        return {
            msg: "Hello World",
            id:2,
            playerId: 1,
            game: {
                name:"test",
                description:"test",
                price:0
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
        },
        removeItem(id) {
            this.games.splice(this.games.map(i => i.id).indexOf(id), 1)
        }
    }
}
</script>