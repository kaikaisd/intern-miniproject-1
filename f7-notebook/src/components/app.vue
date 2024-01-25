<template>
  <f7-app v-bind="f7params">

  <!-- Left panel with cover effect-->
  <f7-panel left cover dark>
    <f7-view links-view=".view-main" >
      <f7-page>
        <f7-navbar title="Navigation"></f7-navbar>
        <!-- <f7-block>Tab</f7-block> -->
        <f7-list strong inset divider-ios>
            <f7-list-item link="/" panel-close reload-all title="Post Editor"></f7-list-item>
            <f7-list-item link="/list/" panel-close title="List Post"></f7-list-item>
        </f7-list>
      </f7-page>
    </f7-view>
  </f7-panel>


  <!-- Your main view, should have "view-main" class -->
  <f7-view main class="safe-areas" url="/"></f7-view>


    <!-- Popup -->
    <f7-popup id="my-popup">
      <f7-view>
        <f7-page>
          <f7-navbar title="Popup">
            <f7-nav-right>
              <f7-link popup-close>Close</f7-link>
            </f7-nav-right>
          </f7-navbar>
          <f7-block>
            <p>Popup content goes here.</p>
          </f7-block>
        </f7-page>
      </f7-view>
    </f7-popup>

  </f7-app>
</template>
<script>
  import { ref, onMounted } from 'vue';
  import { f7, f7ready } from 'framework7-vue';

  import routes from '../js/routes.js';
  import store from '../js/store';

  export default {
    setup() {

      // Framework7 Parameters
      const f7params = {
        //pushState: true,
        name: 'notebook', // App name
        theme: 'auto', // Automatic theme detection




        // App store
        store: store,
        // App routes
        routes: routes,
      };

      onMounted(() => {
        f7ready(() => {


          // Call F7 APIs here
        });
      });

      return {
        f7params,
        pushState: true,
      }
    }
  }
</script>