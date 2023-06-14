<template>
  <h1>狼数据</h1>
  <p>前排解释：</p>
  <p>pop 为狼在一波中占的容量，一般来说 pop 越大则出现机会越少。</p>
  <p>charm 影响到寻路，charm 为负值越小则其他狼越会排斥它。</p>
  <p>hp_factor 影响血量关于等级增长，是二次函数系数。</p>
  <el-table
    :data="allMonsters"
    :default-sort="{ prop: 'id', order: 'ascending' }"
    table-layout="auto"
    stripe
    :header-cell-style="{ 'text-align': 'center' }"
    :cell-style="{ 'text-align': 'center' }"
    max-height="600"
    style="width: 100%; max-width: 1200px"
  >
    <el-table-column prop="id" label="id" sortable :width="150" />
    <el-table-column prop="data.name" label="name" sortable />
    <el-table-column prop="data.speedBase" label="speedBase" sortable />
    <el-table-column prop="data.population" label="population" sortable />
    <el-table-column prop="data.charm" label="charm" sortable :width="100" />
    <el-table-column label="size">
      <el-table-column prop="data.width" label="width" sortable :width="100" />
      <el-table-column prop="data.height" label="height" sortable :width="100" />
    </el-table-column>
    <el-table-column label="hpFactor">
      <el-table-column prop="data.hpMaxA" label="a" sortable :width="100" />
      <el-table-column prop="data.hpMaxB" label="b" sortable :width="100" />
      <el-table-column prop="data.hpMaxC" label="c" sortable :width="100" />
    </el-table-column>
    <el-table-column label="skills" type="expand" width="60">
      <template #default="props">
        <div class="sk-list">
          <p v-for="skill in props.row.skills">
            <span v-if="skill.isDebuff" class="sk-debuff">↓</span>
            <span v-else class="sk-buff">↑</span>
            <span class="sk-name">{{ skill.name }}</span>
            <span class="sk-id">[{{ skill.data.id }}]</span>
            <span class="sk-info">{{ skill.skillInfo }}</span>
          </p>
        </div>
        <!-- <div v-html="props.row.skills" style="margin-left: 2em"></div> -->
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { GlobalData } from "@/tdsheep/ado/GlobalData.js";
import { Monster } from "@/tdsheep/module/unit/Monster.js";
import _ from "lodash-es";
import { formatHtml } from "@/utils/format";

interface RowData {
  id: string;
  data: any;
  skills: any;
}
console.log("init wolfs");
const allMonsters = _.map(GlobalData.$_wolfAtt_Obj, (t, k) => k)
  .sort()
  .map(t => {
    let _wolf = new Monster(t, 0, 0);
    _wolf.initSkills();
    let _md = _wolf.monsterData;
    return {
      id: t,
      data: _md,
      skills: Object.values(_wolf.skills),
    };
  });

function getSkillSign(_skill) {
  return !_skill.isDebuff
    ? formatHtml("↑", 0xff0000, true, "", "monospace")
    : formatHtml("↓", 0, true, "", "monospace");
}
function getSkillHtml(_skill) {
  const _tagColor = 0x4040f0;
  let _htmlTextArr = [];

  _htmlTextArr.push(
    getSkillSign(_skill) + " " + formatHtml(_skill.name, 0x000040, true, "") + "&nbsp;"
  );
  _htmlTextArr.push(formatHtml(`[${_skill.data.id}] `, 0x777777, true, "smaller"));
  _htmlTextArr.push(formatHtml(_skill.skillInfo, 0x333333, false, "smaller"));
  if (_skill.skillTag1) _htmlTextArr.push(formatHtml(_skill.skillTag1, _tagColor, false, "small"));
  if (_skill.skillTag2) _htmlTextArr.push(formatHtml(_skill.skillTag2, _tagColor, false, "small"));
  if (_skill.skillTag3) _htmlTextArr.push(formatHtml(_skill.skillTag3, _tagColor, false, "small"));
  return _htmlTextArr.join("");
}
</script>

<style lang="scss" scoped>
.sk-list {
  margin-left: 2em;
  span {
    margin-right: 0.5em;
  }
  .sk-buff {
    color: red;
    font-weight: bold;
    font-family: monospace;
  }
  .sk-debuff {
    color: black;
    font-weight: bold;
    font-family: monospace;
  }
  .sk-name {
    color: #000040;
    font-weight: bold;
  }
  .sk-id {
    color: #777;
    font-weight: bold;
    font-size: smaller;
  }
  .sk-info {
    color: #333;
    font-size: smaller;
  }
}
</style>
