import axios from '../assets/js/http.js';

export default {
  dologinSync(context, data) {
    return new Promise((reslove, reject) => {
      axios.post('/api/userlogin', data).then(res => {
        reslove(res)
        context.commit('getuserinfo', res.data.list)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
