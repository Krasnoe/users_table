<template>
  <select 
      v-model="filterValue"
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
    options: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    filterValue: {
      get() {
        return this.$store.state.filterValue
      },
      set(value) {
        this.$store.commit('setFilterValue', value)
      }
    }
  },

  methods: {
    setEmptyFilterValue() {
      this.$emit('setEmptyFilterValue');
    }
  }
}
</script>