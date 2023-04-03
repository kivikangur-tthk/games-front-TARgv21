<template>
    <user-games :playerId="playerId"></user-games>
</template>
<script>

import userGames from "../components/userGames.vue"

export default {
    props: {
        playerId:Number,
        required:true,
        },
    components:{
        userGames
    }
}
</script>