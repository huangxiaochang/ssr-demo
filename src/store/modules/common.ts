import type { Module, ActionTree, MutationTree, GetterTree } from 'vuex'

// IMPORTANT: state must be a function so the module can be
// instantiated multiple times
const state = () => ({
  menusList: [] as any[],
  userInfo: {} as Record<string, any>,
})

export type CommonState = ReturnType<typeof state>

const mutations: MutationTree<CommonState> = {
  SET_MENUS(state: CommonState, payload: CommonState['menusList']) {
    state.menusList = payload
  },
  SET_USER_INFO(state: CommonState, payload: CommonState['userInfo']) {
    state.userInfo = payload
  },
}

// ActionTree<moduleState, rootState>
const actions: ActionTree<CommonState, any> = {
  setMenus({ commit }, data) {
    commit('SET_MENUS', data)
  },
  setUserInfo({ commit }, data) {
    commit('SET_USER_INFO', data)
  },
}

// getters<moduleState, rootState>
const getters: GetterTree<CommonState, any> = {
  getMenus(state) {
    return state.menusList
  },
  getUserInfo(state) {
    return state.userInfo
  },
}

// Module<moduleState, rootState>
const CommonModule: Module<CommonState, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}

export default CommonModule
