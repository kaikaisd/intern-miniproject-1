import { createApp } from "vue";
import Main from "./main.vue";
import "./css/main.css";
import VueMarkdownEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
import { router } from "./router.js";
// import { createProvider } from 'vue-apollo';

VueMarkdownEditor.use(vuepressTheme);

const app = createApp(Main);
app.use(router);
app.use(VueMarkdownEditor);
// app.use(createProvider())

app.mount("#app");
