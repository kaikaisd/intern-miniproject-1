<template>
    <div id="ListNote">
        <div class="container mx-auto px-8 py-4">
            <ol class="list-decimal">
                <li v-for="note in notes" :key="note">
                    <router-link :to="`../notebooks/${note.id}`" class="text-blue-400 hover:text-blue-600">{{ note.title
                    }}</router-link>
                </li>
            </ol>
        </div>
    </div>
</template>

<script>
import Api from '../js/Api_gql.js';
export default {
    name: 'ListNote',
    data() {
        return {
            notes: []
        }
    },
    methods: {
        getNotes() {
            Api.fetchItems().then((data) => {
                console.log(data)
                this.notes = data;
            })
        }
    },
    created() {
        this.getNotes();
    }
}
</script>

<style></style>