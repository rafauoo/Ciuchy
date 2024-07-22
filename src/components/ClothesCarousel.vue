<template>
    <div class="carousel-container" v-hammer:swipe="onSwipe">
      <button @click="prev" class="nav-button prev">‹</button>
      <div class="carousel">
        <div v-if="clothes.length > 0" class="carousel-item">
          <img :src="`http://20.160.76.93:8000/${clothes[currentIndex].img}`" :alt="'Clothing ' + clothes[currentIndex].id" />
          <div>{{ clothes[currentIndex].action }}</div>
        </div>
        <div v-else class="carousel-item">
          No clothes available.
        </div>
      </div>
      <button @click="next" class="nav-button next">›</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ClothesCarousel',
    data() {
      return {
        clothes: [],
        currentIndex: 0
      };
    },
    created() {
      this.fetchClothes();
    },
    methods: {
      fetchClothes() {
        axios.get('http://20.160.76.93:8000/ciuchy/')
          .then(response => {
            this.clothes = response.data;
            this.$emit('clothing-changed', this.clothes[this.currentIndex]?.action);
          })
          .catch(error => {
            console.error('Error fetching clothes:', error);
          });
      },
      prev() {
        if (this.currentIndex > 0) {
          this.currentIndex--;
        } else {
          this.currentIndex = this.clothes.length - 1;
        }
        this.$emit('clothing-changed', this.clothes[this.currentIndex]?.action);
      },
      next() {
        if (this.currentIndex < this.clothes.length - 1) {
          this.currentIndex++;
        } else {
          this.currentIndex = 0;
        }
        this.$emit('clothing-changed', this.clothes[this.currentIndex]?.action);
      },
      onSwipe(event) {
        if (event.direction === 2) { // swipe left
          this.next();
        } else if (event.direction === 4) { // swipe right
          this.prev();
        }
      }
    }
  };
  </script>
  
  
  <style>
  .carousel-container {
    position: relative;
    width: 300px; /* Set your desired width */
    margin: auto;
    text-align: center;
  }
  
  .carousel {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .carousel-item {
    width: 100%;
  }
  
  .carousel-item img {
    width: 100%;
    height: auto;
  }
  
  .nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%) scale(2);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
  }
  
  .prev {
    left: 0;
  }
  
  .next {
    right: 0;
  }
  </style>
  