import { createStore } from 'vuex';
import usersList from '@/mock/users.json';

export default createStore({
  state: {
    users: usersList,
    filterValue: '',
    filterValueInput: '',
    filterValueStart: 0,
    filterValueEnd: 1,
    sortBy: '',
    clicked: false,
  },
  getters: {
    filtredUsers(state) {
      if (state.filterValue === 'login') {
        return [...state.users].filter(user => user.login.toLowerCase().includes(state.filterValueInput.toLowerCase()))
      }
      if (state.filterValue === 'orders') {
        return [...state.users].filter(user => state.filterValueEnd >= user.orders && user.orders >= state.filterValueStart)
      }
      if (state.filterValue === 'status') {
        return [...state.users].filter(user => user.status.toLowerCase().includes(state.filterValueInput.toLowerCase()))
      }
      return [...state.users]
    },
    sortedFiltredUsers(state, getters) {
      if (state.sortBy === 'status' || state.sortBy === 'login') {
        return [...getters.filtredUsers].sort((val1, val2) => state.clicked ? val1[state.sortBy].localeCompare(val2[state.sortBy]) : val2[state.sortBy].localeCompare(val1[state.sortBy]))
      } else if (state.sortBy === 'orders') {
        return [...getters.filtredUsers].sort((val1, val2) => state.clicked ? val1[state.sortBy] - val2[state.sortBy] : val2[state.sortBy] - val1[state.sortBy])
      } else if (state.sortBy === 'place') {
        return [...getters.filtredUsers].sort((val1, val2) => state.clicked ? val2[state.sortBy] - val1[state.sortBy] : val1[state.sortBy] - val2[state.sortBy])
      }
      return [...getters.filtredUsers];
    },
  },
  mutations: {
    setFilterValue(state, filterValue) {
      state.filterValue = filterValue
    },
    setFilterValueInput(state, filterValueInput) {
      state.filterValueInput = filterValueInput
    },
    setFilterValueStart(state, filterValueStart) {
      state.filterValueStart = filterValueStart;
    },
    setFilterValueEnd(state, filterValueEnd) {
      state.filterValueEnd = filterValueEnd;
    },
    setSortBy(state, sortBy) {
      state.sortBy = sortBy
    },
    setClicked(state, clicked) {
      state.clicked = clicked
    }
  },
})
