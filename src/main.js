import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import 'vuetify/styles';
import 'vuetify/dist/vuetify.min.css';

const vuetify = createVuetify({
  components: {
    ...components
  },
  directives
});

app.use(vuetify);
app.mount('#app');
// createApp(App).use(vuetify).mount('#app')
