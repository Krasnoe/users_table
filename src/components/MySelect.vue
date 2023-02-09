<template>
  <select 
      :value="filterValue"
      @change="setEmptyFilterValue"
      class="select"
    >
      <option 
        disabled 
        value=""
        class="option"
      >
        Выберите фильтр
      </option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        class="option"
      >
        {{ option.text }}
      </option>
    </select>
</template>

<script>
export default {
  props: {
    filterValue: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    setEmptyFilterValue(e) {
      this.$emit('setEmptyFilterValue', e.target.value);
    }
  }
}
</script>