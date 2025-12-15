import axios from "axios";

const baseURL = 'http://localhost:8089'
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
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

export default service