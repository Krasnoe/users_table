<template>
  <label 
    for="text-input" 
    class="filters-inputs-label"
  >
    Введите {{ filterValue === 'login' ? 'логин' : 'статус' }}
  </label>
  <input
    id="text-input"
    class="filters-inputs-input"
    type="text" 
    :value="filterValueInput"
    @input="setQueryFilterValueInput"
    >
</template>

<script>
export default {
  emits: ['setQueryFilterValueInput'], 

  props: {
    filterValue: {
      type: String,
      default: ''
    },
    filterValueInput: {
      type: String,
      default: ''
    },
  },

  methods: {
    setQueryFilterValueInput(e) {
      this.$emit('setQueryFilterValueInput', e.target.value);
    }
  }
}
</script>