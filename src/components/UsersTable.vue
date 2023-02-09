<template>
  <table class="users-table">
    <tr>
      <td 
        v-for="button in tableHeads"
        :key="button.value"
        class="users-table-td users-table-top"
      >
        <button 
          @click="sortTable(button.value)" 
          :disabled="!clicked"
          class="users-table-button"
        >
          <TriangleIcon class="triangle"/>
        </button>

        <button 
          @click="sortTable(button.value)" 
          :disabled="clicked"
          class="users-table-button"
        >
          <TriangleIcon class="triangle reverse"/>
        </button>
      </td>
    </tr>
    <tr>
      <td 
        v-for="head in tableHeads"
        :key="head.value"
        class="users-table-td"
      >
        {{ head.text }}
      </td>
    </tr>
    <tr 
      v-for="user in sortedFiltredUsers"
      :key="user.place"
    >
      <td class="users-table-td">{{ user.place }}</td>
      <td class="users-table-td">{{ user.login }}</td>
      <td class="users-table-td">{{ user.orders }}</td>
      <td class="users-table-td">{{ user.status }}</td>
    </tr>
  </table>
</template>

<script>
import TriangleIcon from '@/assets/icons/TriangleIcon.vue';

export default {
  emits: ['sortTable'], 

  components: {
    TriangleIcon
  },

  props: {
    tableHeads: {
      type: Array,
      default: () => []
    },
    sortedFiltredUsers: {
      type: Array,
      default: () => []
    },
    clicked: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    sortTable(val) {
      this.$emit('sortTable', val)
    }
  }
}
</script>
