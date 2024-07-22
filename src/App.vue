<template>
  <div id="app">
    <ClothesCarousel ref="clothesCarousel" />
    <ActionsList @action-selected="updateClothingAction" />
  </div>
</template>

<script>
import axios from 'axios';
import ClothesCarousel from './components/ClothesCarousel.vue';
import ActionsList from './components/ActionsList.vue';

export default {
  name: 'App',
  components: {
    ClothesCarousel,
    ActionsList
  },
  methods: {
    updateClothingAction(action) {
      const selectedClothing = this.$refs.clothesCarousel.clothes[this.$refs.clothesCarousel.currentIndex];
      if (selectedClothing) {
        axios.put(`http://localhost:8000/ciuchy/${selectedClothing.id}/action`, { action: action })
          .then(response => {
            this.$refs.clothesCarousel.clothes[this.$refs.clothesCarousel.currentIndex].action = action;
          })
          .catch(error => {
            console.error('Error updating clothing action:', error);
          });
      }
    }
  }
};
</script>

<style>
#app {
  text-align: center;
}
</style>
