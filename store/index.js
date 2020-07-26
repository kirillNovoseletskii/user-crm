import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const store = () => new Vuex.Store({
  state: {
    data: [],
    subdivisions: []
  },
  actions:{
      async SET_DATA({commit}){
        const data = await this.$axios.get('http://localhost:3001/')
        commit('UPDATE_DATA', data.data)
        const subdivisions = await this.$axios.get('http://localhost:3001/subdivisions')
        commit('UPDATE_SUB', subdivisions.data)
      },
      REMOVE_RIELT({commit}, id){
        commit('REMOVE_RIELT', id)
      },
      createRielt({commit}, form){
        form.guid = uuidv4()
        form.id = String(Math.floor(Math.random()*100000 * Math.random()*10))
        commit('ADD_RIELTOR', form)
      },
      editRieltor({commit}, data){
        commit('EDIT', data)
      }
  },

  mutations: {
    UPDATE_DATA(state, data){
        state.data = data
    },
    UPDATE_SUB(state, subdivisions){
      state.subdivisions = subdivisions
    },
    async REMOVE_RIELT(state, id){ 
      state.data = state.data.filter(r => r.id != id)
      await this.$axios.post('http://localhost:3001/delete', {id})
    },
    async ADD_RIELTOR(state, form){
      await this.$axios.post('http://localhost:3001/', form)
    },
    async EDIT(state, data){
      await this.$axios.post('http://localhost:3001/edit', {
        indx: state.data.indexOf(data),
        data: data
      })
    }
  },
  getters: {
      data(state){
        return state.data
      },
      subs(state){
        return state.subdivisions
      }
  }
})

export default store