<template>
  <div>
    <h1>狼相关计算</h1>
    <p>
      狼：
      <el-select v-model="form.wid" @change="updateSkillInit">
        <el-option-group label="前线">
          <el-option
            v-for="item in wolfList0"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          />
        </el-option-group>
        <el-option-group label="防线">
          <el-option
            v-for="item in wolfList1"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          />
        </el-option-group>
        <el-option-group label="噩梦">
          <el-option
            v-for="item in wolfList2"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          />
        </el-option-group>
      </el-select>
    </p>
    <p>
      等级： <el-input-number v-model="form.level" :min="1" @change="recalcPower" /> 最高等级：{{
        form.levelMax
      }}
    </p>
    <p>升级经验：{{ form.expMax }}</p>
    <p>血量：{{ form.hpMax }}</p>
    <p>速度：{{ form.speed }}</p>
    <p>实力：{{ form.power }}</p>
    <p>技能</p>
    <el-table
      ref="skillTableRef"
      :data="form.tableData"
      style="font-size: small"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" :width="30" />
      <el-table-column label="KindId" :width="160" header-align="center">
        <template #default="scope">
          <el-select
            v-model="scope.row.kindId"
            @change="updateSkillInfo0(scope.row)"
            style="font-size: small"
          >
            <el-option v-for="item in skillKindList" :key="item" :label="item" :value="item" />
          </el-select>
          <!-- <el-tree-select v-model="scope.row.id" lazy :load="load" :cache-data="cacheData" /> -->
        </template>
      </el-table-column>
      <el-table-column label="Id" :width="200" header-align="center">
        <template #default="scope">
          <el-select
            v-model="scope.row.id"
            @change="updateSkillInfo(scope.row)"
            style="font-size: small"
          >
            <el-option
              v-for="item in skillDict[scope.row.kindId]"
              :key="item.id"
              :label="item.id"
              :value="item.id"
            />
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
      <el-table-column
        prop="levelMax"
        label="Level Max"
        :width="100"
        header-align="center"
        align="center"
      />
      <el-table-column
        prop="score"
        label="Score"
        :width="100"
        header-align="center"
        align="center"
      />
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
import { tr } from "@/utils/translate";
import { ElTable } from "element-plus";
import _, { fromPairs } from "lodash-es";

const skillTableRef = ref<InstanceType<typeof ElTable>>();

const wolfList = _.sortBy(
  _.map(GlobalData.$_wolfAtt_Obj, (v, k) => ({ id: k, name: v.name, label: `${tr(k)} [${k}]` })),
  "id"
);
const wolfList1 = wolfList.filter(t => t.name.startsWith("camp_"));
const wolfList2 = wolfList.filter(t => t.id.startsWith("D_"));
const wolfList0 = _.difference(wolfList, wolfList1, wolfList2);

const skillDict = _.groupBy(GlobalData.$_skillAtt_Obj.monsterSkill, t => t.kindId);
_.each(skillDict, (t, k) => (skillDict[k] = _.sortBy(t, "id")));
console.log(skillDict);
const skillKindList = Object.keys(skillDict).sort();
const skillTree = _.map(skillDict, (v, k) => ({
  label: k,
  value: k,
  children: v.map(c => ({ value: c.id })),
}));
/* const cacheData = skillTree.map(t => _.pick(t, "label", "value"));
console.log("ca", cacheData);
const load = (node, resolve) => {
  console.log(node, resolve);
  if (node.isLeaf) return resolve([]);
  return resolve([]);
}; */

interface SkillItem {
  kindId: string;
  id: string;
  name: string;
  level: int;
  levelMax: int;
  score: float;
  info: string;
  tags: string;
}

const form = reactive({
  wid: "al",
  level: 1,
  levelMax: 60,
  power: 0,
  hpMax: 0,
  expMax: 0,
  speed: 0,
  tableData: [] as SkillItem[],
  selected: [] as string[],
});

const dummy = new Monster("daihuil");
const defaultSkill = new MonsterSkill("WeakFire_X1", 1, dummy).getSubClasses();
recalcPower();

const formatItem = (skill: MonsterSkill): SkillItem => {
  return reactive({
    kindId: skill.data.kindId,
    id: skill.data.id,
    name: skill.data.name,
    level: skill.level,
    levelMax: skill.levelMax,
    score: skill.skillScore,
    info: skill.skillInfo,
    tags: skill.skillTag1 + skill.skillTag2 + skill.skillTag3,
  });
};
const addRow = () => {
  const item = formatItem(defaultSkill);
  form.tableData.push(item);
  skillTableRef.value?.toggleRowSelection(item, true);
};
const handleSelectionChange = (val: SkillItem[]) => {
  form.selected = val.map(t => t.id);
  recalcPower();
};

function updateSkillInit() {
  const _wolf = new Monster(form.wid, form.level, 1, 0, []);
  _wolf.initSkills();
  const _skills = _.sortBy(_wolf.skills as any as MonsterSkill[], "index");
  form.speed = _wolf.monsterData.speedBase;
  form.levelMax = _wolf.levelMax;
  form.tableData = _skills.map(s => formatItem(s));
  skillTableRef.value?.toggleAllSelection();
  // handleSelectionChange(skillTableRef.value?.getSelectionRows());
  recalcPower();
}
function updateSkillInfo0(row: SkillItem) {
  const _skill = new MonsterSkill(skillDict[row.kindId][0].id, 1, dummy).getSubClasses();
  Object.assign(row, formatItem(_skill));
  recalcPower();
}
function updateSkillInfo(row: SkillItem) {
  console.log(row);
  const _skill = new MonsterSkill(row.id, row.level, dummy).getSubClasses();
  Object.assign(row, formatItem(_skill));
  recalcPower();
}
function recalcPower() {
  let _downerSkills = form.tableData
    .filter(r => form.selected.includes(r.id))
    .map(r => ({ skid: r.id, lev: r.level }));
  let _wolf = new Monster(form.wid, form.level, 1, 0, _downerSkills, []);
  _wolf.refreshLevel();
  form.hpMax = _wolf.hpMax;
  form.expMax = _wolf.expMax;
  form.power = _wolf.power;
}
</script>

<style lang="scss" scoped>
/* .cell .el-select .el-input {
  font-size: small !important;
} */
.sk-tag {
  color: #4040f0;
  font-size: small;
}
</style>
