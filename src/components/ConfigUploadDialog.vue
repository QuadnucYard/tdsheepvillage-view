<template>
  <el-dialog title="上传文件" v-model="dialogVisible" width="30%" @close="resetDialog">
    <el-upload
      ref="upload"
      v-model:file-list="fileList"
      drag
      action="#"
      :limit="1"
      :before-upload="handleBeforeUpload"
      :on-exceed="handleExceed"
      :auto-upload="false"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或点击上传</div>
      <div class="el-upload__tip">只能上传json文件</div>
    </el-upload>
    <div>
      <el-checkbox v-model="isMerge" label="合并数据" size="large" />
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="submitUpload">确定</el-button>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ElMessage, genFileId } from "element-plus";
import type { UploadInstance, UploadProps, UploadRawFile, UploadUserFile } from "element-plus";


import { GlobalData, updateSysConfig, updateSysConfigMerged } from "@/tdsheep/ado/GlobalData";

const dialogVisible = ref(false);

const upload = ref<UploadInstance>();
const fileList = ref<UploadUserFile[]>([]);

const isMerge = ref(true);

const handleBeforeUpload = (file: File) => {
  const isJson = file.type === "application/json";
  if (!isJson) {
    ElMessage.error("只能上传json文件");
  }
  return isJson; // 返回 true 允许上传，false 禁止上传
};

const handleExceed: UploadProps["onExceed"] = (files) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};

// 提交上传后的操作
const submitUpload = () => {
  if (fileList.value.length === 0) {
    ElMessage.error("请上传文件");
    return;
  }
  // 这里可以执行文件上传后的操作
  loadFile(fileList.value[0].raw!);

  ElMessage.success("上传成功");
};

const loadFile = (file: File) => {
  const reader = new FileReader();

  reader.onload = (event) => {
    const fileContent = event.target!.result as string;
    const json = JSON.parse(fileContent);
    ElMessage.success("文件读取成功");

    if (isMerge.value) {
      updateSysConfigMerged(json);
    } else {
      updateSysConfig(json);
    }
    ElMessage.success("数据更新成功");

    dialogVisible.value = false; // 关闭对话框
    resetDialog(); // 重置文件列表
  };

  reader.onerror = () => {
    ElMessage.error("文件读取失败");
  };

  reader.readAsText(file); // 读取文件内容为文本
};

const resetDialog = () => {
  upload.value = undefined;
};

const show = () => {
  dialogVisible.value = true;
};

defineExpose({ show });
</script>

<style scoped></style>
