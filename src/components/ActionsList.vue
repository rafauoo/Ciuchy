<template>
  <div class="actions-list">
    <button
      v-for="action in actions"
      :key="action.action"
      :class="{ selected: action.action === selectedAction }"
      @click="selectAction(action.action)"
    >
      {{ action.action }}
    </button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ActionsList',
  data() {
    return {
      actions: [],
      selectedAction: null
    };
  },
  created() {
    this.fetchActions();
  },
  methods: {
    fetchActions() {
      axios.get('http://localhost:8000/actions/')
        .then(response => {
          this.actions = response.data;
        })
        .catch(error => {
          console.error('Error fetching actions:', error);
        });
    },
    selectAction(action) {
      this.selectedAction = action;
      this.$emit('action-selected', action);
    }
  }
};
</script>

<style>
.actions-list {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

button {
  margin-bottom: 10px;
  padding: 10px;
  cursor: pointer;
}

button.selected {
  background-color: green;
  color: white;
}
</style>
