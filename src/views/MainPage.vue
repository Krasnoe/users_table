<template>
  <div class="app">
    <h1 class="app-title">Таблица пользователей</h1>
    <div class="filters-wrapper">
      <h2 class="filters-title">Фильтр</h2>
      <div class="filters-inputs">
        <MySelect 
          :options="options"
          @setEmptyFilterValue="setEmptyFilterValue"
        />

        <div v-if="filterValue">
          <div 
            v-if="filterValue !== 'orders'" 
            class="filters-inputs-inner"
          >
            <MyInput 
              :filterValue="filterValue"
              :filterValueInput="filterValueInput"
              @setQueryFilterValueInput="setQueryFilterValueInput" 
            />
          </div>

          <div 
            v-if="filterValue === 'orders'"
            class="filters-inputs-inner"
          >
            <MyInputStartEnd
              :id="'start-input'"
              :model-value="filterValueStart"
              @update:model-value="setValueStart"
              @setDefaultValueStartEnd="setDefaultValueStartEnd"
              @setValueStartEnd="setFilterValueStart"
            >
              <slot>От</slot>
            </MyInputStartEnd>

            <MyInputStartEnd
              :id="'end-input'"
              :model-value="filterValueEnd"
              @update:model-value="setValueEnd"
              @setDefaultValueStartEnd="setDefaultValueStartEnd"
              @setValueStartEnd="setFilterValueEnd"
            >
              <slot>До</slot>
            </MyInputStartEnd>
          </div>
        </div>

        <div class="reset-button">
          <button @click="setDefaultSort">Сбросить сортировку</button>
        </div>
      </div>
    </div>

    <div class="table-wrapper">
      <UsersTable 
        :tableHeads="tableHeads"
        :sortedFiltredUsers="sortedFiltredUsers"
        :clicked="clicked"
        @sortTable="sortTable"
      />
    </div>
  </div>
</template>

<script>
import MySelect from '@/components/MySelect.vue';
import MyInput from '@/components/MyInput.vue';
import MyInputStartEnd from '@/components/MyInputStartEnd.vue';
import UsersTable from '@/components/UsersTable.vue';
import { mapGetters, mapMutations, mapState } from 'vuex';
import { options } from '@/helpers/constants/options';
import { tableHeads } from '@/helpers/constants/tableHeads';

export default {
  name: 'MainPage',
  components: {
    MySelect,
    MyInput,
    MyInputStartEnd,
    UsersTable
  },

  data() {
    return {
      options,
      tableHeads
    }
  },

  computed: {
    ...mapState({
      filterValue: state => state.filterValue,
      filterValueInput: state => state.filterValueInput,
      filterValueStart: state => state.filterValueStart,
      filterValueEnd: state => state.filterValueEnd,
      sortBy: state => state.sortBy,
      clicked: state => state.clicked
    }),

    ...mapGetters({
      filtredUsers: 'filtredUsers',
      sortedFiltredUsers: 'sortedFiltredUsers'
    }),
  },

  methods: {
    ...mapMutations({
      setFilterValue: 'setFilterValue',
      setFilterValueInput: 'setFilterValueInput',
      setFilterValueStart: 'setFilterValueStart',
      setFilterValueEnd: 'setFilterValueEnd',
      setSortBy: 'setSortBy',
      setClicked: 'setClicked',
    }),

    applyFiltersAndSort() {
      if (this.$route.query.filterValueInput) {
        this.setFilterValueInput(this.$route.query.filterValueInput);
        this.setFilterValue(this.$route.query.filter);
      }
      if (this.$route.query.filterValueStart) {
        this.setFilterValueStart(this.$route.query.filterValueStart);
        this.setFilterValue(this.$route.query.filter);
      }
      if (this.$route.query.filterValueEnd) {
        this.setFilterValueEnd(this.$route.query.filterValueEnd);
        this.setFilterValue(this.$route.query.filter);
      }
      if (this.$route.query.sortBy) {
        this.setClicked(this.$route.query.clicked === 'true')
        this.setSortBy(this.$route.query.sortBy);
      }
    },

    setQueryFilterValueInput(val) {
      this.setFilterValueInput(val)
      if (this.filterValueInput) {
        this.$router.push({ name: 'home', query: { 
          ...this.$route.query,
          filter: this.filterValue, 
          filterValueInput: this.filterValueInput 
        }})
      } else {
        this.setEmptyFilterValue();
      }
    },

    setEmptyFilterValue() {
      const query = Object.assign({}, this.$route.query);
      delete query.filter;
      delete query.filterValueInput;
      delete query.filterValueStart;
      delete query.filterValueEnd;
      this.$router.replace({ query: query });
      this.setFilterValueInput('');
      this.setFilterValueStart(0);
      this.setFilterValueEnd(1);
    },

    sortTable(value) {
      this.setClicked(!this.clicked)
      this.setSortBy(value);
      this.$router.push({ name: 'home', query: {
          ...this.$route.query,
          sortBy: this.sortBy, 
          clicked: this.clicked
        } 
      })
    },

    setValueStart(val) {
      this.setFilterValueStart(val);
      this.setQueryStartEnd()
    },

    setValueEnd(val) {
      this.setFilterValueEnd(val);
      this.setQueryStartEnd()
    },

    setQueryStartEnd() {
      this.$router.push({ name: 'home', query: {
          ...this.$route.query,
          filter: this.filterValue, 
          filterValueStart: this.filterValueStart, 
          filterValueEnd: this.filterValueEnd
        } 
      })
    },

    setDefaultValueStartEnd() {
      if (this.filterValueStart === '') {
        this.setFilterValueStart(0);
      }
      if (this.filterValueEnd === '') {
        this.setFilterValueEnd(1);
      }
    },

    setDefaultSort() {
      const query = Object.assign({}, this.$route.query);
      delete query.sortBy;
      delete query.clicked;
      this.$router.replace({ query: query });
      this.setSortBy('');
      this.setClicked(false)
    },
  },

  mounted() {
    this.applyFiltersAndSort()
  }
}
</script>

