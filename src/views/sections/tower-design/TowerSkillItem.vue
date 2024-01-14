<template>
  <div>
    <el-select v-model="modelValue.kindId" @update:model-value="onSelect">
      <template v-for="a in Object.keys(skillTemplates)" :key="a">
        <el-option v-if="!(a in tower.skills)" :label="a" :value="a" />
      </template>
    </el-select>
    <span v-if="template" class="ml-2 space-x-2">
      <template v-for="(p, i) in template.params" :key="i">
        <el-input v-if="typeof p === 'string'" v-model="modelValue.params[i]" size="small" style="width: 100px" />
        <el-input-number
          v-if="typeof p === 'number'"
          v-model="modelValue.params[i]"
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
import { TowerSkillData } from "@/tdsheep/command/skill";
import { TowerSkill } from "@/tdsheep/module/skill";
import { Tower } from "@/tdsheep/module/unit/Tower";
import { getStep } from "@/utils";
import { skillTemplates } from "@/utils/ui-data";

const tower = defineModel<Tower>("tower", { required: true });
const modelValue = defineModel<{ kindId: string; params: (number | string)[] }>({
  required: true,
});

defineEmits<{
  "update:model-value": [];
}>();

type TemplateType = typeof skillTemplates;
const template = ref<TemplateType[keyof TemplateType]>();

const onSelect = () => {
  template.value = skillTemplates[modelValue.value.kindId];
  modelValue.value.params = template.value.params.slice();
};

watch(
  () => modelValue.value.kindId,
  (newValue, oldValue) => {
    if (oldValue != newValue) {
      delete tower.value.skills[oldValue];
      const skill = new TowerSkill(
        template.value!.id,
        tower.value.skills[newValue]?.level ?? 50,
        tower.value
      ).getSubClasses();
      skill.m_data = new TowerSkillData(modelValue.value);
      tower.value.skills[newValue] = skill;
    }
  }
);

watch(
  modelValue,
  (newValue) => {
    tower.value.skills[newValue.kindId].m_data = new TowerSkillData(newValue);
  },
  { deep: true }
);

onUnmounted(() => {
  if (modelValue.value.kindId) {
    delete tower.value.skills[modelValue.value.kindId];
  }
});
</script>

<style scoped></style>
