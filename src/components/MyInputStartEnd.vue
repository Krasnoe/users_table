<template>
  <label 
    :for="id"
    class="label"
  >
    <slot />
  </label>
  <input
    :id="id"
    type="number"
    class="input"
    :value="modelValue"
    @input="updateInput($event)"
    @blur="setDefaultValueStartEnd"
    @keydown.enter="setValueStartEnd"
  >
</template>

<script>
export default {
  emits: [
    'update:modelValue', 
    'setDefaultValueStartEnd', 
    'setValueStartEnd'
  ], 

  props: {
    id: {
      type: String,
    },
    modelValue: {
      type: [Number, String],
    },
  },

  methods: {
    updateInput(e) {
      this.$emit('update:modelValue', e.target.value)
    },
    setDefaultValueStartEnd() {
      this.$emit('setDefaultValueStartEnd')
    },
    setValueStartEnd() {
      this.$emit('setValueStartEnd')
    }
  }
}
</script>