<template>
  <div>
    <div>
      <el-tag
        v-for="tag in modelValue"
        :key="tag.id"
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
        <!-- <el-autocomplete
          ref="InputRef"
          v-model="inputValue"
          :fetch-suggestions="querySearch"
          clearable
          class="inline-input w-50"
          size="small"
          placeholder="Please Input"
          @select="handleSelect"
        >
          <template #default="{ item }">
            {{ item.value }}
            <el-text class="mx-1" type="primary">[{{item.id}}]</el-text>
          </template>
        </el-autocomplete> -->
        <el-select
          ref="InputRef"
          v-model="inputValue"
          filterable
          :filter-method="filterOptions"
          class="inline-block m-0.5"
          placeholder="Select"
          size="small"
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
import { ElAutocomplete, ElInput, ElSelect } from "element-plus";
import "element-plus/es/components/autocomplete/style/css";

import { GlobalData, MonsterId } from "@/tdsheep/ado/GlobalData";
import { getTotalPop } from "@/utils/game-utils";
import { tr } from "@/utils/translate";

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
/* const querySearch = (queryString: string, cb: any) => {
  const results = queryString ? props.wolfList.filter(createFilter(queryString)) : props.wolfList;
  // call callback function to return suggestions
  cb(results);
}; */
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
