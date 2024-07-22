<template>
    <div class="upload-clothing">
      <h2>Upload Multiple Clothing Items</h2>
      <form @submit.prevent="submitForm">
        <input type="file" multiple @change="handleFileChange" />
        <input type="text" v-model="action" placeholder="Enter action (optional)" />
        <button type="submit">Upload</button>
      </form>
      <div v-if="statusMessage" class="status-message">{{ statusMessage }}</div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'UploadClothing',
    data() {
      return {
        files: [],
        action: '',
        statusMessage: ''
      };
    },
    methods: {
      handleFileChange(event) {
        this.files = event.target.files;
      },
      async submitForm() {
        const formData = new FormData();
        
        for (let i = 0; i < this.files.length; i++) {
          formData.append('files', this.files[i]);
        }
        
        if (this.action) {
          formData.append('action', this.action);
        }
  
        try {
          const response = await axios.post('http://20.160.76.93:8000/ciuchy/multiple/', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          this.statusMessage = `Success: ${response.data.items_created} items created.`;
        } catch (error) {
          this.statusMessage = `Error: ${error.response ? error.response.data.detail : error.message}`;
        }
      }
    }
  };
  </script>
  
  <style>
  .upload-clothing {
    max-width: 600px;
    margin: auto;
    padding: 20px;
  }
  
  .upload-clothing form {
    display: flex;
    flex-direction: column;
  }
  
  .upload-clothing input[type="file"] {
    margin-bottom: 10px;
  }
  
  .upload-clothing input[type="text"] {
    margin-bottom: 10px;
  }
  
  .upload-clothing button {
    margin-top: 10px;
  }
  
  .status-message {
    margin-top: 10px;
    font-weight: bold;
  }
  </style>
  