import axios from 'axios'
import store from '@/store/';

if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = ""
} else if (process.env.NODE_ENV == 'debug') {
    axios.defaults.baseURL = ""
} else {
    axios.defaults.baseURL = ""
}

axios.defaults.timeout = 10000;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// 先导入vuex,因为我们要使用到里面的状态对象
// vuex的路径根据自己的路径去写


// 请求拦截器
axios.interceptors.request.use(    
config => {        
        // 每次发送请求之前判断vuex中是否存在token        
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断 
        const token = store.state.token;        
        token && (config.headers.Authorization = token);        
        return config;    
    },    
    error => {        
        return Promise.error(error);    
})

// response interceptors


// api method encap
const pullApi = {

}

// export
export default pullApi