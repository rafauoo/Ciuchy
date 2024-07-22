import { createRouter, createWebHistory } from 'vue-router';
import UploadClothing from './components/UploadClothing.vue'; // Import your component
import App from './App.vue'

const routes = [
  { path: '/', component: App }, // Optional: a home route or other routes
  { path: '/upload', component: UploadClothing } // Route for the UploadClothing component
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;