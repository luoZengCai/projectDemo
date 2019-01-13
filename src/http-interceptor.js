import axios from 'axios'
import store from './store';

axios.interceptors.request.use(
    config => {
         if (store.state.token) {
             config.headers.token = store.state.token
         }
         return config
    }
)