<template>
    <game-list :games="games" @deleted="removeItem"></game-list>
</template>
<script>
const API_URL = "http://localhost:8080/players"
import gameList from "./gameList.vue"

export default {
    components:{
        gameList
    },
    props: {
        playerId: Number,
        required: true
    },
    data() {
        return {
            games:[],
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        async fetchData() {
            const url = `${API_URL}/${this.playerId}`
            const playerData = await (await fetch(url)).json()
            this.games = playerData.GamePlays.map(gp => gp.Game)
            console.log(this.games)
        },
        removeItem(id) {
            this.games.splice(this.games.map(i => i.id).indexOf(id), 1)
        }
    }    
}
</script>
<style>

</style>