<template>
  <div>
    <el-select v-model="modelValue.kindId" @update:model-value="onSelect">
      <template v-for="a in Object.keys(GlobalData.skillTemplates)" :key="a">
        <el-option v-if="!(a in tower.skills)" :label="a" :value="a" />
      </template>
    </el-select>
    <span v-if="template" class="ml-2 space-x-2">
      <template v-for="(p, i) in template.params">
        <el-input
          v-if="typeof p === 'string'"
          v-model="(modelValue.params[i] as string)"
          size="small"
          style="width: 100px"
        />
        <el-input-number
          v-else
          v-model="(modelValue.params[i] as number)"
          size="small"
          controls-position="right"
          :step="getStep(p)"
          style="width: 100px"
        />
      </template>
    </span>
  </div>
</template>

<script setup lang="ts">
import { GlobalData } from "@/tdsheep/ado/GlobalData";
import { TowerSkillData } from "@/tdsheep/command/skill";
import { TowerSkill } from "@/tdsheep/module/skill";
import { Tower } from "@/tdsheep/module/unit/Tower";
import { getStep } from "@/utils";

const props = defineProps<{ tower: Tower }>();
const modelValue = defineModel<{ kindId: string; params: (number | string)[] }>({
  required: true,
});

const emits = defineEmits<{
  "update:model-value": [];
}>();

type TemplateType = typeof GlobalData.skillTemplates;
const template = ref<TemplateType[keyof TemplateType]>();

const onSelect = () => {
  template.value = GlobalData.skillTemplates[modelValue.value.kindId];
  modelValue.value.params = template.value.params.slice();
};

watch(
  () => modelValue.value.kindId,
  (newValue, oldValue) => {
    if (oldValue != newValue) {
      delete props.tower.skills[oldValue];
      const skill = new TowerSkill(
        template.value!.id,
        props.tower.skills[newValue]?.level ?? 50,
        props.tower
      ).getSubClasses();
      skill.m_data = new TowerSkillData(modelValue.value);
      props.tower.skills[newValue] = skill;
    }
  }
);

watch(
  modelValue,
  (newValue, oldValue) => {
    props.tower.skills[newValue.kindId].m_data = new TowerSkillData(newValue);
  },
  { deep: true }
);

onUnmounted(() => {
  if (modelValue.value.kindId) {
    delete props.tower.skills[modelValue.value.kindId];
  }
});
</script>

<style scoped></style>
