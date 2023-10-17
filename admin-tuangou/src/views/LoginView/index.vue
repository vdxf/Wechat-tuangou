<template>
  <div class="login-view">
    <div class="login-content">
      <h1>新友团管理平台</h1>
      <p>欢迎使用</p>
      <el-form class="login-form">
        <el-form-item>
          <el-input :prefix-icon="User" v-model="loginForm.Account" placeholder="请填写账号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input :prefix-icon="Lock" clearable v-model="loginForm.Password" type="password" show-password placeholder="请填写密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" :loading="loading" type="primary" size="default" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus'
import { reactive, ref } from 'vue'
import useUserStore from '@/stores/modules/user'
import { reqLogin } from '@/api/user'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()

const loading = ref(false)

const loginForm = reactive({
  Account: 'admin',
  Password: 'xyt2023',
})

const handleLogin = async () => {
  loading.value = true
  try {
    await userStore.userLogin(loginForm)
    router.replace('/')
    ElNotification({
      type: 'success',
      message: '登录成功'
    })
    loading.value = false
  } catch (error) {
    loading.value = false
    ElNotification({
      type: 'error',
      message: error
    })
  }
}
 
</script>

<style scoped lang="scss">
.login-view {
  width: 100%;
  height: 100vh;
  background: url('@/assets/image/login.jpg') no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-content {
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-size: 32px;
    line-height: 1.6;
    font-weight: 600;
  }
  p {
    margin-top: 10px;
    font-size: 14px;
    line-height: 1.6;
  }
}
.login-form {
  margin-top: 48px;
  width: 70%;
}
.login-btn {
  width: 100%;
}
</style>