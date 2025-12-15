<template>
  <div class="login-wrapper">
    <div class="login-container">
      <div class="login-form">
        <h2>用户登录</h2>
        <div class="form-group">
          <input 
            v-model="loginForm.username" 
            placeholder="请输入用户名" 
            class="form-input"
            @keyup.enter="handleLogin"
          />
        </div>
        <div class="form-group">
          <input 
            v-model="loginForm.password" 
            placeholder="请输入密码" 
            type="password" 
            class="form-input"
            @keyup.enter="handleLogin"
          />
        </div>
        <button @click="handleLogin" class="login-button">登录</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router';
import request from '@/utils/request'

const router = useRouter();
// 定义登录表单数据
const loginForm = reactive({
  username: 'root',
  password: '123456'
})

// 处理登录逻辑
const handleLogin = () => {
  request.post("/login", loginForm).then(res => {
    if (res.data) {
      localStorage.setItem('token', res.data)
      router.push('/home')
    }
  }).catch(error => {
    console.error('登录失败:', error);
  })
}
</script>

<style scoped>
.login-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
}

.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 100%, #764ba2 0%);

}

.login-form {
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  text-align: center;
  box-sizing: border-box;
}

.login-form h2 {
  margin-bottom: 30px;
  color: #333;
  font-size: 28px;
}

.form-group {
  margin-bottom: 20px;
}

.form-input {
  width: 100%;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
}

.login-button {
  width: 100%;
  padding: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.login-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.login-button:active {
  transform: translateY(0);
}
</style>