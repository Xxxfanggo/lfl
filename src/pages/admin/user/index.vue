<template>
  <div class="user-management">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>用户管理</span>
          <el-button type="primary">新增用户</el-button>
        </div>
      </template>

      <!-- 搜索表单 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="用户名">
          <el-input v-model="searchForm.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="searchForm.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search">查询</el-button>
          <el-button :icon="Refresh">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 数据表格 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="phone" label="手机号" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="role" label="角色" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag :type="row.status === '启用' ? 'success' : 'danger'">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default>
            <el-button type="primary" link>编辑</el-button>
            <el-button type="danger" link>删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        class="pagination"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search, Refresh } from '@element-plus/icons-vue'

const searchForm = ref({
  username: '',
  phone: ''
})

const tableData = ref([
  {
    id: 1,
    username: 'admin',
    name: '管理员',
    phone: '13800138000',
    email: 'admin@example.com',
    role: '超级管理员',
    status: '启用',
    createTime: '2024-01-01 12:00:00'
  },
  {
    id: 2,
    username: 'user001',
    name: '张三',
    phone: '13900139000',
    email: 'zhangsan@example.com',
    role: '普通用户',
    status: '启用',
    createTime: '2024-01-02 10:30:00'
  },
  {
    id: 3,
    username: 'user002',
    name: '李四',
    phone: '13700137000',
    email: 'lisi@example.com',
    role: '普通用户',
    status: '禁用',
    createTime: '2024-01-03 15:20:00'
  }
])

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(3)
</script>

<style scoped lang="scss">
.user-management {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .search-form {
    margin-bottom: 20px;
  }

  .pagination {
    margin-top: 20px;
    justify-content: flex-end;
  }
}
</style>
