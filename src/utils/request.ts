import axios from "axios";
import router from "@/router"; // 引入路由实例

const baseURL = 'http://localhost:8089/lbl'
const service = axios.create({
  baseURL
})

service.interceptors.request.use(config => {
  // 确保 Content-Type 设置正确
  if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
  }
  
  const token = localStorage.getItem('token')
  
  if (token) {
    config.headers.Authorization = token
  } else {
    // 如果没有token且不是登录请求，则跳转到登录页面
    if (config.url !== '/login' && config.url !== '/oauth2/github/callback' ) {
      router.push('/login')
      // 取消请求
      return Promise.reject(new Error('未登录，请先登录'))
    }
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 响应拦截器 - 处理401未授权状态
service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      // 清除本地token
      localStorage.removeItem('token');
      // 跳转到登录页
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

export default service