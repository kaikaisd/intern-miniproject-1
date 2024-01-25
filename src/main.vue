<template>
  <div id="main">
    <div class="py-4 flex justify-end">
      <div class="px-2">
        <router-link to="/" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded">
          Add Notes
        </router-link>
      </div>
      <div class="px-6">
        <router-link to="/notebooks/list" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded">
          List Notebooks
        </router-link>
      </div>
    </div>

    <router-view :isReadonly="isReadonly" :formData="form" @submitForm="submitForm" @updateForm="updateForm" @deleteDM="deleteDM">
    </router-view>
  </div>
</template>

<script>
import Api from './js/Api_gql.js';
export default {
  name: 'Main',
  data() {
    return {
      form: {
        id: null,
        title: '',
        contents: '',
      },
    }
  },
  methods: {
    submitForm(formData) {
      Api.addItem(formData.title, formData.contents).then((data) => {
        if (data !== null){
          location.reload();
        }
      })
    },
    updateForm(formData) {
      Api.editItem(formData.id, formData.title ,formData.contents).then((data) => {
        console.log(data);
      })
    },
    deleteDM(formData) {
      Api.deleteItem(formData.id).then((data) => {
        console.log(data);
      })
    }
  },
  computed: {
    isReadonly() {
      return this.$route.params.id !== undefined;
    },
  },
  beforeMount() {
    if (this.$route.params.id !== undefined) {
      Api.getItem(this.$route.params.id).then((data) => {
        this.form = data;
      })
    }
  },
  created() {
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        if (toParams.id == null){
          if (this.form.title != ""){
            this.form.id = ''
            this.form.title = ''
            this.form.contents = ''
          }
          // this.id = null,
          
        }
      }
    )
  }
}
</script>

<style></style>
