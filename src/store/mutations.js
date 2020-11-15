export default {
  add(state, info) {
    state.infos.push(info)
  },
  del(state, index) {
    state.infos.splice(index, 1)
  }
}
