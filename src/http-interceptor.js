import axios from 'axios'
import store from './store';
import router from './router';

axios.interceptors.request.use(
    config => {
         if (store.state.token) {
             config.headers.token = store.state.token
         }
         return config
    }
)


axios.interceptors.response.use(
    response => {
        if (response.status == 200) {
            const code = response.data.code
            if (code == -1) {
                redirectLogin()
            }
        }
        return response
    },err => {
        if (err.response.status === 401) {
            redirectLogin()
        }
    }
)

function redirectLogin(){
    store.commit('setToken', '')
    localStorage.removeItem('token')
    router.push({
        path:'/login',
        query: {redirect: router.currentRoute.path}
    })
}