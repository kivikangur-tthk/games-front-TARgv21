<template>
    <table>
        <tr>
            <th>Name</th>
            <th>Price</th>
            <th></th>
        </tr>
        <tr v-for="game in games" :key="game.id">
            <td>{{ game.name }}</td>
            <td>{{ game.price }}</td>
            <td>Link detailidele</td>
        </tr>
    </table>
</template>
<script>
export default {
    props: {
        games: Array,
        required: true
    },
}
</script>
<style>
table,
th,
td {
    border: 1px solid black;
}
</style>