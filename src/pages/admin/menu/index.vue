<template>
  <div class="menu-management">
    <el-row :gutter="20">
      <!-- 左侧树形菜单 -->
      <el-col :span="6">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>菜单树</span>
              <el-button type="primary" size="small" :icon="Plus">新增</el-button>
            </div>
          </template>
          <el-tree
            :data="menuData"
            :props="treeProps"
            :expand-on-click-node="false"
            :highlight-current="true"
            node-key="id"
            @node-click="handleNodeClick"
          >
            <template #default="{ node, data }">
              <span class="custom-tree-node">
                <span>{{ node.label }}</span>
                <span class="node-actions">
                  <el-button type="primary" link size="small" @click.stop="handleAdd(data)">
                    <el-icon><Plus /></el-icon>
                  </el-button>
                  <el-button type="primary" link size="small" @click.stop="handleEdit(data)">
                    <el-icon><Edit /></el-icon>
                  </el-button>
                  <el-button type="danger" link size="small" @click.stop="handleDelete(data)">
                    <el-icon><Delete /></el-icon>
                  </el-button>
                </span>
              </span>
            </template>
          </el-tree>
        </el-card>
      </el-col>

      <!-- 右侧详情 -->
      <el-col :span="18">
        <el-card>
          <template #header>
            <span>{{ currentMenu ? '编辑菜单' : '菜单详情' }}</span>
          </template>

          <el-form v-if="currentMenu" :model="currentMenu" label-width="100px">
            <el-form-item label="菜单名称">
              <el-input v-model="currentMenu.label" />
            </el-form-item>
            <el-form-item label="菜单类型">
              <el-select v-model="currentMenu.type" style="width: 100%">
                <el-option label="目录" value="directory" />
                <el-option label="菜单" value="menu" />
                <el-option label="按钮" value="button" />
              </el-select>
            </el-form-item>
            <el-form-item label="路由路径">
              <el-input v-model="currentMenu.path" />
            </el-form-item>
            <el-form-item label="组件路径">
              <el-input v-model="currentMenu.component" />
            </el-form-item>
            <el-form-item label="图标">
              <el-input v-model="currentMenu.icon" />
            </el-form-item>
            <el-form-item label="排序">
              <el-input-number v-model="currentMenu.sort" :min="0" />
            </el-form-item>
            <el-form-item label="状态">
              <el-switch v-model="currentMenu.status" active-text="启用" inactive-text="禁用" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary">保存</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>

          <el-empty v-else description="请选择左侧菜单查看详情" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Edit, Delete } from '@element-plus/icons-vue'

interface MenuNode {
  id: number
  label: string
  type?: string
  path?: string
  component?: string
  icon?: string
  sort?: number
  status?: boolean
  children?: MenuNode[]
}

const treeProps = {
  children: 'children',
  label: 'label'
}

const currentMenu = ref<MenuNode | null>(null)

const menuData = ref<MenuNode[]>([
  {
    id: 1,
    label: '系统管理',
    type: 'directory',
    path: '/system',
    icon: 'Setting',
    sort: 1,
    status: true,
    children: [
      {
        id: 11,
        label: '用户管理',
        type: 'menu',
        path: '/admin/user',
        component: '@/pages/admin/user/index.vue',
        icon: 'User',
        sort: 1,
        status: true
      },
      {
        id: 12,
        label: '角色管理',
        type: 'menu',
        path: '/admin/role',
        component: '@/pages/admin/role/index.vue',
        icon: 'UserFilled',
        sort: 2,
        status: true
      },
      {
        id: 13,
        label: '权限管理',
        type: 'menu',
        path: '/admin/permission',
        component: '@/pages/admin/permission/index.vue',
        icon: 'Lock',
        sort: 3,
        status: true
      },
      {
        id: 14,
        label: '菜单管理',
        type: 'menu',
        path: '/admin/menu',
        component: '@/pages/admin/menu/index.vue',
        icon: 'Menu',
        sort: 4,
        status: true
      }
    ]
  },
  {
    id: 2,
    label: '业务管理',
    type: 'directory',
    path: '/business',
    icon: 'Briefcase',
    sort: 2,
    status: true,
    children: []
  }
])

const handleNodeClick = (data: MenuNode) => {
  currentMenu.value = data
}

const handleAdd = (data: MenuNode) => {
  console.log('新增子菜单', data)
}

const handleEdit = (data: MenuNode) => {
  currentMenu.value = data
}

const handleDelete = (data: MenuNode) => {
  console.log('删除菜单', data)
}
</script>

<style scoped lang="scss">
.menu-management {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  :deep(.custom-tree-node) {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 8px;
    font-size: 14px;

    .node-actions {
      display: none;
    }

    &:hover .node-actions {
      display: flex;
      gap: 5px;
    }
  }
}
</style>
