<template>
  <div>
    <div>
      <el-tag
        v-for="(tag, i) in modelValue"
        :key="i"
        type="info"
        effect="plain"
        class="m-0.5"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
      >
        <ruby>
          {{ tag.value }} <rt>{{ tag.id }}</rt>
        </ruby>
      </el-tag>
      <template v-if="inputVisible">
        <el-select
          ref="InputRef"
          v-model="inputValue"
          filterable
          :filter-method="filterOptions"
          class="inline-block m-0.5"
          placeholder="Select"
          size="small"
          style="max-width: 160px"
          @change="handleSelect"
        >
          <el-option v-for="item in options" :key="item.id" :value="item">
            {{ item.value }}
            <el-text class="mx-1" type="primary">[{{ item.id }}]</el-text>
          </el-option>
        </el-select>
      </template>

      <el-button v-else class="button-new-tag m-0.5" type="primary" plain size="small" @click="showInput">
        +
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElSelect } from "element-plus";

import { MonsterId } from "@/tdsheep/ado/GlobalData";

const props = defineProps<{ wolfList: WolfItem[] }>();
const modelValue = defineModel<WolfItem[]>();
const emit = defineEmits<{ change: [] }>();

const inputValue = ref("");
const inputVisible = ref(false);
const InputRef = ref<InstanceType<typeof ElSelect>>();
const options = ref(props.wolfList.slice());

type WolfItem = { id: MonsterId; value: string };

const handleClose = (tag: WolfItem) => {
  modelValue.value!.splice(modelValue.value!.indexOf(tag), 1);
  emit("change");
};

const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value!.focus();
  });
};

const filterOptions = (queryString: string) => {
  console.log(queryString);
  options.value = queryString ? props.wolfList.filter(createFilter(queryString)) : props.wolfList;
};

const createFilter = (queryString: string) => {
  return (item: WolfItem) => {
    return item.id.toLowerCase().includes(queryString.toLowerCase()) || item.value.includes(queryString);
  };
};

const handleSelect = (item: WolfItem) => {
  modelValue.value!.push(item);
  modelValue.value!.sort((a, b) => a.id.localeCompare(b.id));
  inputVisible.value = false;
  inputValue.value = "";
  emit("change");
};
</script>

<style scoped></style>
