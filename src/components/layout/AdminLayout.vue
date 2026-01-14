<template>
  <el-container class="admin-layout">
    <!-- 侧边栏 -->
    <el-aside :width="isCollapse ? '64px' : '200px'" class="admin-aside">
      <div class="logo">
        <el-icon v-if="isCollapse" :size="24"><Setting /></el-icon>
        <template v-else>
          <el-icon :size="24"><Setting /></el-icon>
          <span>后台管理</span>
        </template>
      </div>
      <el-menu
        :default-active="activeMenu"
        :router="true"
        :collapse="isCollapse"
        class="sidebar-menu"
        background-color="#1d2329"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
      >
        <el-menu-item index="/admin/user">
          <el-icon><User /></el-icon>
          <template #title>用户管理</template>
        </el-menu-item>
        <el-menu-item index="/admin/role">
          <el-icon><UserFilled /></el-icon>
          <template #title>角色管理</template>
        </el-menu-item>
        <el-menu-item index="/admin/permission">
          <el-icon><Lock /></el-icon>
          <template #title>权限管理</template>
        </el-menu-item>
        <el-menu-item index="/admin/menu">
          <el-icon><Menu /></el-icon>
          <template #title>菜单管理</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 主体内容 -->
    <el-container class="admin-container">
      <!-- 顶部导航 -->
      <el-header class="admin-header">
        <div class="header-left">
          <el-button
            :icon="Fold"
            @click="toggleSidebar"
            text
            class="collapse-btn"
          />
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ currentPage }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="header-right">
          <div class="header-actions">
            <el-tooltip content="刷新" placement="bottom">
              <el-button :icon="Refresh" text circle />
            </el-tooltip>
            <el-tooltip content="全屏" placement="bottom">
              <el-button :icon="FullScreen" text circle />
            </el-tooltip>
          </div>
          <el-dropdown @command="handleCommand" class="user-dropdown">
            <div class="user-info">
              <el-avatar :size="32" icon="UserFilled" />
              <span class="username">管理员</span>
              <el-icon class="arrow-down"><ArrowDown /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">
                  <el-icon><User /></el-icon>
                  <span>个人中心</span>
                </el-dropdown-item>
                <el-dropdown-item command="settings">
                  <el-icon><Setting /></el-icon>
                  <span>系统设置</span>
                </el-dropdown-item>
                <el-dropdown-item divided command="logout">
                  <el-icon><SwitchButton /></el-icon>
                  <span>退出登录</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <!-- 内容区域 -->
      <el-main class="admin-main">
        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  User,
  UserFilled,
  Lock,
  Menu,
  Fold,
  Setting,
  Refresh,
  FullScreen,
  SwitchButton,
  ArrowDown
} from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

const isCollapse = ref(false)

// 当前激活的菜单
const activeMenu = computed(() => route.path)

// 当前页面名称
const currentPage = computed(() => {
  const map: Record<string, string> = {
    '/admin/user': '用户管理',
    '/admin/role': '角色管理',
    '/admin/permission': '权限管理',
    '/admin/menu': '菜单管理'
  }
  return map[route.path] || '首页'
})

// 切换侧边栏
const toggleSidebar = () => {
  isCollapse.value = !isCollapse.value
}

// 下拉菜单命令处理
const handleCommand = (command: string) => {
  switch (command) {
    case 'profile':
      console.log('个人中心')
      break
    case 'settings':
      console.log('设置')
      break
    case 'logout':
      console.log('退出登录')
      router.push('/login')
      break
  }
}
</script>

<style scoped lang="scss">
.admin-layout {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.admin-aside {
  background-color: #1d2329;
  overflow: hidden;
  transition: width 0.3s;

  .logo {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    border-bottom: 1px solid #141517;
    transition: all 0.3s;

    .el-icon {
      color: #409EFF;
    }
  }

  .sidebar-menu {
    border-right: none;
    height: calc(100vh - 50px);

    :deep(.el-menu-item) {
      &.is-active {
        background-color: #409EFF !important;

        &::before {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 3px;
          background-color: #fff;
        }
      }
    }
  }
}

.admin-container {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.admin-header {
  height: 50px;
  background-color: #fff;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;

  .header-left {
    display: flex;
    align-items: center;
    gap: 16px;

    .collapse-btn {
      padding: 8px;
      font-size: 18px;
    }

    :deep(.el-breadcrumb) {
      font-size: 14px;
    }
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 16px;

    .header-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      padding-right: 16px;
      border-right: 1px solid #e8e8e8;
    }

    .user-dropdown {
      cursor: pointer;

      .user-info {
        display: flex;
        align-items: center;
        gap: 8px;

        .username {
          font-size: 14px;
          color: #606266;
        }

        .arrow-down {
          font-size: 12px;
          transition: transform 0.3s;
        }
      }

      &:hover .arrow-down {
        transform: rotate(180deg);
      }
    }
  }
}

.admin-main {
  flex: 1;
  background-color: #f5f7fa;
  padding: 16px;
  overflow-y: auto;
  overflow-x: hidden;

  :deep(.el-card) {
    border-radius: 4px;
    border: 1px solid #ebeef5;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    .el-card__header {
      padding: 16px;
      border-bottom: 1px solid #ebeef5;
    }
  }
}

// 路由过渡动画
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.3s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
