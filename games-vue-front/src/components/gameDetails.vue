<template>
    <div>
        <h1>Name: {{ game.name }}</h1>
        <p>Description: {{ game.description }}</p>
        <h3>Price: {{ game.price }}</h3>
    </div>
</template>
<script>
    export default {
        props: {
            game: Object,
            required:true
        },
    }
</script>