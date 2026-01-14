<template>
  <div class="permission-management">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>权限管理</span>
          <el-button type="primary">新增权限</el-button>
        </div>
      </template>

      <!-- 搜索表单 -->
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="权限名称">
          <el-input v-model="searchForm.name" placeholder="请输入权限名称" />
        </el-form-item>
        <el-form-item label="权限编码">
          <el-input v-model="searchForm.code" placeholder="请输入权限编码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search">查询</el-button>
          <el-button :icon="Refresh">重置</el-button>
        </el-form-item>
      </el-form>

      <!-- 数据表格 -->
      <el-table :data="tableData" border style="width: 100%" row-key="id" :tree-props="{ children: 'children' }">
        <el-table-column prop="name" label="权限名称" width="200" />
        <el-table-column prop="code" label="权限编码" width="200" />
        <el-table-column prop="type" label="权限类型" width="120">
          <template #default="{ row }">
            <el-tag :type="getTypeTagType(row.type)">
              {{ row.type }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="resource" label="资源路径" />
        <el-table-column prop="description" label="描述" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === '启用' ? 'success' : 'danger'">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default>
            <el-button type="primary" link>编辑</el-button>
            <el-button type="danger" link>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search, Refresh } from '@element-plus/icons-vue'

const searchForm = ref({
  name: '',
  code: ''
})

const tableData = ref([
  {
    id: 1,
    name: '用户管理',
    code: 'user',
    type: '菜单',
    resource: '/admin/user',
    description: '用户管理模块',
    status: '启用',
    children: [
      {
        id: 11,
        name: '用户查询',
        code: 'user:query',
        type: '按钮',
        resource: '/admin/user/query',
        description: '查询用户列表',
        status: '启用'
      },
      {
        id: 12,
        name: '用户新增',
        code: 'user:add',
        type: '按钮',
        resource: '/admin/user/add',
        description: '新增用户',
        status: '启用'
      },
      {
        id: 13,
        name: '用户编辑',
        code: 'user:edit',
        type: '按钮',
        resource: '/admin/user/edit',
        description: '编辑用户信息',
        status: '启用'
      },
      {
        id: 14,
        name: '用户删除',
        code: 'user:delete',
        type: '按钮',
        resource: '/admin/user/delete',
        description: '删除用户',
        status: '启用'
      }
    ]
  },
  {
    id: 2,
    name: '角色管理',
    code: 'role',
    type: '菜单',
    resource: '/admin/role',
    description: '角色管理模块',
    status: '启用',
    children: [
      {
        id: 21,
        name: '角色查询',
        code: 'role:query',
        type: '按钮',
        resource: '/admin/role/query',
        description: '查询角色列表',
        status: '启用'
      },
      {
        id: 22,
        name: '角色新增',
        code: 'role:add',
        type: '按钮',
        resource: '/admin/role/add',
        description: '新增角色',
        status: '启用'
      }
    ]
  },
  {
    id: 3,
    name: '权限管理',
    code: 'permission',
    type: '菜单',
    resource: '/admin/permission',
    description: '权限管理模块',
    status: '启用'
  },
  {
    id: 4,
    name: '菜单管理',
    code: 'menu',
    type: '菜单',
    resource: '/admin/menu',
    description: '菜单管理模块',
    status: '启用'
  }
])

const getTypeTagType = (type: string) => {
  const map: Record<string, any> = {
    '菜单': 'primary',
    '按钮': 'success',
    'API': 'warning'
  }
  return map[type] || ''
}
</script>

<style scoped lang="scss">
.permission-management {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .search-form {
    margin-bottom: 20px;
  }
}
</style>
