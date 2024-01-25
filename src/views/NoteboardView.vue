<template>
    <div id="noteboard">
        <div class="container mx-auto px-4 py-2">
            <!-- Title Input -->
            <div class="mb-4">
                <label for="title" class="block text-lg font-semibold text-gray-700">Title</label>
                <input type="text" id="title" name="title"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter title here" v-model="localFormData.title" :readonly="isReadonly">
            </div>

            <!-- Markdown Input -->
            <div class="mb-4">
                <label for="markdownInput" class="block text-lg font-semibold text-gray-700">Contents</label>
                <v-md-editor v-model="localFormData.contents" height="400px" name="markdownInput"></v-md-editor>

            </div>

            <div class="flex">
                <div v-if="isReadonly">
                    <button type="submit"
                        class="flex-1 h-14 text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded"
                        @click="$emit('updateForm', localFormData)" v-show="isReadonly">Update</button>

                    <button type="button"
                        class="flex-1 h-14 text-center bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-5 rounded"
                        v-show="isReadonly"  @click="$emit('deleteDM', localFormData)">Delete</button>
                </div>
                <div v-else>
                    <button type="submit"
                    class="grow h-14 text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded"
                    @click="$emit('submitForm', localFormData)" >Submit</button>
                </div>
                
            </div>

        </div>
    </div>
</template>

<script>
import Api from '../js/Api_gql.js';
export default {
    name: 'NoteboardView',
    props: ['isReadonly', 'formData'],
    expose: ['submitForm', 'updateForm', 'deleteDM'],
    data() {
        return {
            localFormData: { ...this.formData }
        }
    },
    watch: {
        formData: {
            handler(newValue) {
                this.localFormData = { ...newValue };
            },
            deep: true,
        },
    },
    created() {
        if (this.isReadonly) {
            Api.getItem(this.$route.params.id).then((data) => {
                this.formData.id = data.id;
                this.formData.title = data.title;
                this.formData.contents = data.contents;
            })
        }
    }
}
</script>

<style>
/* Additional CSS if needed */
.grid-cell {
    width: 100px;
    height: 100px;
}
</style>