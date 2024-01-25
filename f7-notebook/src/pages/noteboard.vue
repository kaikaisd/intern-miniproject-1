<template>
  <f7-page name="noteboard" ptr @ptr:refresh="refresh">
    <!-- <f7-navbar title="Noteboard" back-link="Back"></f7-navbar> -->
    <f7-navbar large :sliding="false">
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-md="material:menu" panel-open="left"></f7-link>
      </f7-nav-left>
      <!-- <f7-nav-title sliding>Noteboard</f7-nav-title> -->
      
      <f7-nav-title-large>Noteboard</f7-nav-title-large>
    </f7-navbar>
    <f7-block strong inset>
      <f7-list no-hairlines-md>
        <f7-list-input
          label="Title"
          type="text"
          placeholder="Enter title here"
          v-model:value="localFormData.title"
          :readonly="isReadonly"
        ></f7-list-input>
        <h5>Contents</h5>
        <v-md-editor v-model="localFormData.contents" height="400px" name="markdownInput"></v-md-editor>

      </f7-list>
      <f7-block>
        <f7-button fill @click="isReadonly ? updateForm(localFormData) : submitForm(localFormData)">Submit</f7-button>
        <f7-button fill color="red" v-if="isReadonly" @click="deleteDM(localFormData)">Delete</f7-button>
      </f7-block>
    </f7-block>
  </f7-page>
</template>

<script>
import Api from '../js/Api_gql.js';
import { f7 } from 'framework7-vue'
export default {
  name: 'Noteboard',
  props: {
    isReadonly: Boolean,
    formData: Object,
    f7router: Object,
  },
  data() {
    return {
      localFormData: { 
        ...this.formData
       }
    }
  },
  methods: {
    refresh(done) {
      setTimeout(() => {
        done();
      }, 1000);
    },
    onPageInit() {
      if (this.f7router.param.id == null ){
        this.f7router.navigate("/", { reloadAll: true});
        return;
      }
    },
    submitForm(formData) {
      Api.addItem(formData.title, formData.contents).then((data) => {
        if (data !== null){
          f7.dialog.alert("Submitted");
          this.f7router.navigate("/", { reloadAll: true});
          location.reload();
        }
      })
    },
    updateForm(formData) {
      Api.editItem(formData.id, formData.title ,formData.contents).then((data) => {
        f7.dialog.alert("Updated");
        this.f7router.navigate("/", { reloadAll: true});
        console.log(data);
      })
    },
    deleteDM(formData) {
      Api.deleteItem(formData.id).then((data) => {
        f7.dialog.alert("Deleted");
        this.f7router.navigate("/", { reloadAll: true});
        // console.log(data);
      })
    }
  },
}
</script>

<style>
/* Additional CSS if needed */
</style>
