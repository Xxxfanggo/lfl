<template>
  <div class="upload-excel">
    <el-upload
      class="upload-demo"
      drag
      action="/api/file/analyze"  
      multiple
      :auto-upload="false"  
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-progress="handleProgress"
      :file-list="fileList"
      :limit="5"  
      :on-exceed="handleExceed"
      accept=".xlsx,.xls"
      :headers="{'Authorization': 'Bearer ' + token}"
      ref="uploadRef"  
      :on-change="handleChange"
      name="files"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        将文件拖到此处，或<em>点击上传</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          只能上传 xlsx/xls 文件，且不超过 10MB
        </div>
      </template>
    </el-upload>

    <!-- 添加手动上传按钮 -->
    <div class="upload-button" >
      <el-button type="primary" @click="submitUpload">开始上传</el-button>
      <el-button @click="clearFiles">清空文件</el-button>
    </div>

    <!-- 上传进度对话框 -->
    <el-dialog
      v-model="progressVisible"
      title="上传进度"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <el-progress :percentage="uploadPercentage" />
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'

const uploadRef = ref(null) 
const files = ref([])
const progressVisible = ref(false)
const uploadPercentage = ref(0)

// token
const token = localStorage.getItem('Token') || sessionStorage.getItem('Token') || ''

// 文件状态改变时的钩子
const handleChange = (file, fileList) => {
  console.log("chagne");
  
  files.value = fileList
  console.log(files.value);
  
}

// 上传前验证
const beforeUpload = (file) => {
  const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
                  file.type === 'application/vnd.ms-excel'
  const isLt10M = file.size / 1024 / 1024 < 10

  if (!isExcel) {
    ElMessage.error('只能上传 Excel 文件!')
    return false
  }
  if (!isLt10M) {
    ElMessage.error('上传文件大小不能超过 10MB!')
    return false
  }
  return true
}

// 上传成功回调
const handleSuccess = (response, file, fileList) => {
  ElMessage.success(`${file.name} 上传成功`)
  progressVisible.value = false
  uploadPercentage.value = 0
  // 更新文件列表
  fileList.value = fileList
}

// 上传失败回调
const handleError = (error, file, fileList) => {
  ElMessage.error(`${file.name} 上传失败`)
  progressVisible.value = false
  uploadPercentage.value = 0
}

// 上传进度回调
const handleProgress = (event, file, fileList) => {
  console.log('handleProgress');
  
  progressVisible.value = true
  uploadPercentage.value = Math.floor(event.percent)
}

// 文件超出限制回调
const handleExceed = (files, fileList) => {
  ElMessage.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
}

// 手动上传
const submitUpload = () => {
  console.log(files);
  
  if (files.value.length === 0) {
    ElMessage.warning('请先选择文件')
    return
  }
  uploadRef.value.submit()  
}

// 清空文件列表
const clearFiles = () => {
  uploadRef.value.clearFiles()
}
</script>

<style scoped>
.upload-excel {
  padding: 20px;
}

.el-upload {
  width: 100%;
}

.el-upload-dragger {
  width: 100%;
}

.upload-button {
  margin-top: 20px;
  text-align: center;
}

.upload-button .el-button {
  margin: 0 10px;
}
</style>