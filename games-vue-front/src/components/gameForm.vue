<template>
    <form @submit.prevent="addGame">
        <label>
            Name:
            <input type="text" v-model="game.name">
        </label>
        <label>
            Genre:
            <input type="text" v-model="game.genre">
        </label>
        <label>
            Description:<br>
            <textarea v-model="game.description" /><br>
        </label>
        <label>
            Studio:
            <input type="text" v-model="game.studio">
        </label>
        <label>
            Release Date:
            <input type="date" v-model="game.release">
        </label>
        <button type="submit">Add Game</button>
    </form>
    <p>
        <span v-for="error in errors">{{ error }}<br></span>
    </p>
</template>
<script>


export default {
    data() {
        return {
            game: {
                name: "",
                genre: "",
                description: "",
                studio: "",
                release: ""
            },
            errors: null
        }
    },
    computed: {
        canSubmit() {
            return this.name.length > 0 && this.genre.length > 0
        }
    },
    methods: {
        addGame() {
            this.errors = null
            const api_url = import.meta.env.VITE_API_URL
            fetch(api_url + "/games", {
                method: "post",
                body: JSON.stringify(this.game),                
                headers: {'Content-type': 'application/json; charset=UTF-8',
                }
            })
            .then((response) => { return response.json() })
            .then((data) => {                
                if (data.error) {
                    this.errors = data.error
                    throw data.error                    
                } else {
                    this.game = {name: "",genre: "",description: "",studio: "",release: ""}
                }
            })
            .catch(error => console.log("Error:",error))
        }
    }
}
</script>
<style>
select,
input,
button {
    display: block;
    margin: 0.5em 0;
    font-size: 15px;
}

input[disabled] {
    color: #999;
}

p {
    color: red;
}
</style>