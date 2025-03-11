<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const apiData = ref(null)
const loading = ref(false)
const error = ref(null)
const newUserName = ref('')

const fetchData = async (endpoint) => {
    loading.value = true
    error.value = null
    apiData.value = null

    try {
        const response = await axios.get(endpoint)
        apiData.value = response.data
    } catch (err) {
        error.value = `获取数据失败: ${err.message}`
    } finally {
        loading.value = false
    }
}

const fetchUsers = async () => {
    loading.value = true
    error.value = null
    apiData.value = null

    try {
        const response = await axios.get('/api/users')
        apiData.value = response.data
    } catch (err) {
        error.value = `获取用户数据失败: ${err.message}`
    } finally {
        loading.value = false
    }
}

const createUser = async (name) => {
    if (!name) return

    try {
        const response = await axios.post('/api/users', { name })
        // 刷新用户列表
        fetchUsers()
    } catch (err) {
        error.value = `创建用户失败: ${err.message}`
    }
}
</script>

<template>
    <div class="api-demo">
        <h2>Node.js API 演示</h2>

        <div class="card">
            <h3>API 测试</h3>
            <div class="button-group">
                <button @click="fetchData('/api/time')">获取当前时间</button>
                <button @click="fetchData('/api/info')">获取系统信息</button>
                <button @click="fetchData('/api/random')">获取随机数</button>
            </div>

            <div class="result-container">
                <div v-if="loading" class="loading">加载中...</div>
                <div v-else-if="error" class="error">{{ error }}</div>
                <div v-else-if="apiData" class="result">
                    <pre>{{ JSON.stringify(apiData, null, 2) }}</pre>
                </div>
                <div v-else class="empty">点击上方按钮获取数据</div>
            </div>
        </div>

        <div class="card">
            <h3>用户管理</h3>
            <div class="user-form">
                <input v-model="newUserName" placeholder="输入用户名" />
                <button @click="createUser(newUserName)">添加用户</button>
            </div>

            <button @click="fetchUsers()">获取所有用户</button>

            <div class="result-container">
                <div v-if="loading" class="loading">加载中...</div>
                <div v-else-if="error" class="error">{{ error }}</div>
                <div v-else-if="apiData && apiData.length > 0" class="user-list">
                    <div v-for="user in apiData" :key="user._id" class="user-item">
                        <span>{{ user.name }}</span>
                        <span class="user-date">创建于: {{ new Date(user.createdAt).toLocaleString() }}</span>
                    </div>
                </div>
                <div v-else-if="apiData" class="empty">暂无用户数据</div>
                <div v-else class="empty">点击"获取所有用户"</div>
            </div>
        </div>
    </div>
</template>