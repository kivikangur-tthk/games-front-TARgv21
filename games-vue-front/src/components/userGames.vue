<template>
    <h3>{{ playerData.firstName }} {{ playerData.lastName }}'s gameplays</h3>
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
            playerData: {firstName:"",lastName:""}
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        async fetchData() {
            const url = `${API_URL}/${this.playerId}`
            this.playerData = await (await fetch(url)).json()
            this.games = this.playerData.GamePlays.map(gp => gp.Game)
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