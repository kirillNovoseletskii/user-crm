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
    subdivisions: [],
    firstNames: [],
    lastNames: [],
    subs: [],
    search: []
  },
  actions:{
      async SET_DATA({commit}){
        const messageRef = this.$fireDb.ref('rieltors')
        await this.$axios.get(messageRef.toString() + '.json').then(response => {
          commit('UPDATE_DATA', Object.values(response.data))
        })
        
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
      },
      async updateNames({commit}){
        const messageRef = this.$fireDb.ref('rieltors')
        await this.$axios.get(messageRef.toString() + '.json').then(response => {
          commit('UPDATE_NAMES', Object.values(response.data))
        })
      },
      writeSearch({commit}, rieltor){
        commit('UPDATE_SEARCH', rieltor)
      }
  },

  mutations: {
    UPDATE_DATA(state, data){
        state.data = data
    },
    async REMOVE_RIELT(state, id){ 
      state.data = state.data.filter(i => i.id != id)
      await this.$fireDb.ref('rieltors').child(id).remove()
    },
    UPDATE_NAMES(state, data){
      for (let i = 0; i < data.length; i++) {
        state.firstNames.push(data[i].firstName)
        state.lastNames.push(data[i].lastName)
        state.subs.push(data[i].subdivision[0].name)
      }
    },
    UPDATE_SEARCH(state, rieltor){
      state.search = rieltor
    },
    async ADD_RIELTOR(state, form){
      let updates = {}
      updates[form.id]=form
      await this.$fireDb.ref('rieltors').update(updates)
    },
    async EDIT(state, data){
      let updates = {}
      updates[data.id]=data
      await this.$fireDb.ref('rieltors').update(updates)
    }
  },
  getters: {
      data(state){
        return state.data
      },
      names(state){
        const names = [state.firstNames, state.lastNames, state.subs]
        return names
      },
      searchRes(state){
        return state.search
      }
  }
})

export default store