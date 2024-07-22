<template>
    <div id="home">
      <ClothesCarousel ref="clothesCarousel" @clothing-changed="handleClothingChange"/>
      <ActionsList ref="actionsList" @action-selected="updateClothingAction" />
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import ClothesCarousel from './ClothesCarousel.vue';
  import ActionsList from './ActionsList.vue';
  
  export default {
    name: 'Home',
    components: {
      ClothesCarousel,
      ActionsList
    },
    methods: {
      handleClothingChange(action) {
        this.$refs.actionsList.selectedAction = action;
      },
      updateClothingAction(action) {
        const selectedClothing = this.$refs.clothesCarousel.clothes[this.$refs.clothesCarousel.currentIndex];
        if (selectedClothing) {
          axios.put(`http://20.160.76.93:8000/ciuchy/${selectedClothing.id}/action`, { action: action })
            .then(response => {
              this.$refs.clothesCarousel.clothes[this.$refs.clothesCarousel.currentIndex].action = action;
              this.handleClothingChange(action);
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
  