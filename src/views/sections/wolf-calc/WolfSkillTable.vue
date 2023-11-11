<template>
  <div>
    <el-table
      ref="skillTableRef"
      :data="skills"
      row-key="index"
      style="font-size: small"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" reverse-selection :width="30" />
      <el-table-column label="KindId" :width="160" header-align="center">
        <template #default="scope">
          <el-select v-model="scope.row.kindId" @change="updateSkillInfo0(scope.row)" style="font-size: small">
            <el-option v-for="item in skillKindList" :key="item" :label="item" :value="item" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="Id" :width="200" header-align="center">
        <template #default="scope">
          <el-select v-model="scope.row.id" @change="updateSkillInfo(scope.row)" style="font-size: small">
            <el-option v-for="item in skillDict[scope.row.kindId]" :key="item.id" :label="item.id" :value="item.id" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Name" :width="120" header-align="center" align="center" />
      <el-table-column prop="level" label="Level" :width="120" header-align="center" align="center">
        <template #default="scope">
          <el-input-number
            v-model="scope.row.level"
            :min="1"
            :max="scope.row.levelMax"
            size="small"
            style="width: 80px"
            @change="updateSkillInfo(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="levelMax" label="Level Max" :width="120" header-align="center" align="center" />
      <el-table-column prop="score" label="Score" :width="120" header-align="center" align="center" />
      <el-table-column label="Info">
        <template #default="scope">
          <span>{{ scope.row.info }}</span>
          <span class="sk-tag">{{ scope.row.tags }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-button @click="addRow">增加一行</el-button>
  </div>
</template>

<script setup lang="ts">
import { GlobalData } from "@/tdsheep/ado/GlobalData";
import { MonsterSkill } from "@/tdsheep/module/skill";
import { Monster } from "@/tdsheep/module/unit/Monster";
import { ElTable } from "element-plus";
import _ from "lodash-es";

const props = defineProps<{ wolf: Monster }>();

const emits = defineEmits<{ change: [] }>();

const skillTableRef = ref<InstanceType<typeof ElTable>>();

const skillDict = _.groupBy(GlobalData.$_skillAtt_Obj.monsterSkill, t => t.kindId);
_.each(skillDict, (t, k) => (skillDict[k] = _.sortBy(t, "id")));
const skillKindList = Object.keys(skillDict).sort();

type SkillItem = {
  index: int;
  kindId: string;
  id: string;
  name: string;
  level: int;
  levelMax: int;
  score: float;
  info: string;
  tags: string;
  skill: MonsterSkill;
};
let skills = reactive<SkillItem[]>([]);

watch(
  () => props.wolf.data.id,
  () => {
    props.wolf.initSkills();
    skills.length = 0;
    skills.push(...props.wolf.skillList.map((sk, i) => formatItem(sk, i))); // 此处不能直接对skills赋值
    skillTableRef.value?.clearSelection();
    skillTableRef.value?.toggleAllSelection();
  }
);
const formatItem = (skill: MonsterSkill, index: int = 0): SkillItem => {
  return reactive({
    index,
    kindId: skill.data.kindId,
    id: skill.data.id,
    name: skill.data.name,
    level: skill.level,
    levelMax: skill.levelMax,
    score: skill.skillScore,
    info: skill.skillInfo,
    tags: skill.skillTag1 + skill.skillTag2 + skill.skillTag3,
    skill,
  });
};

function updateSkillInfo0(row: SkillItem) {
  row.id = skillDict[row.kindId][0].id;
  row.level = 1;
  updateSkillInfo(row);
}
const updateSkillInfo = (item: SkillItem) => {
  const i = skills.indexOf(item);
  const skill = new MonsterSkill(item.id, item.level, props.wolf).getSubClasses();
  props.wolf.skillList[i] = skill;
  Object.assign(item, formatItem(skill, i));
  emits("change");
};

const addRow = () => {
  const item = formatItem(new MonsterSkill("WeakFire_X1", 1, props.wolf).getSubClasses(), skills.length);
  skills.push(item);
  skillTableRef.value?.toggleRowSelection(item, true);
  emits("change");
};
const handleSelectionChange = (val: SkillItem[]) => {
  props.wolf.skillList.forEach(t => (t.enabled = val.find(v => v.skill == t) !== undefined));
};
</script>

<style lang="scss" scoped>
.sk-tag {
  color: #4040f0;
  font-size: smaller;
}
</style>
