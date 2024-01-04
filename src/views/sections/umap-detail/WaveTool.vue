<template>
  <el-card id="wave-tool">
    <h3>波工具</h3>
    <el-button @click="onGenerateWave">随机生成波</el-button>
    <span>
      共
      <el-input-number v-model="form.count" />
      只狼，平均血量
      <el-input v-model.number="form.avgHp" style="width: 100px" />
    </span>
    <el-button>组成推算</el-button>
    <div>
      <p>
        <label>下表为预留量</label>
        <el-button size="small" @click="resetReservation">重置</el-button>
      </p>
      <table>
        <tbody>
          <tr>
            <td v-for="item in mapMonsterData" :key="item.id">{{ item.name }}</td>
          </tr>
          <tr>
            <td v-for="(item, i) in mapMonsterData" :key="item.id">
              <el-input-number v-model="form.reservation[i]" size="small" controls-position="right" :min="0" />
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        额外：<el-input
          v-model="form.extra"
          style="width: 580px"
          placeholder="多个请用半角逗号分隔"
          spellcheck="false"
        />
      </p>
      <p>波：<el-input v-model="form.resultRaw" style="width: 600px" spellcheck="false" /></p>
      <p>波：<el-input v-model="form.result" style="width: 600px" spellcheck="false" /></p>
    </div>
    <WolfNumberChart :data="wolfNumber" :max="10" />
  </el-card>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import _ from "lodash-es";

import { MapId } from "@/tdsheep/ado/GlobalData";
import { MonsterData } from "@/tdsheep/command/unit";
import { generateWave } from "@/utils/game-utils";
import { tr } from "@/utils/translate";

import WolfNumberChart from "@/views/components/WolfNumberChart.vue";

const props = defineProps<{ mid: MapId; mapMonsterData: MonsterData[] }>();

const form = reactive({
  count: 0,
  avgHp: "",
  reservation: [0, 0, 0, 0, 0, 0, 0],
  extra: "",
  result: "",
  resultRaw: "",
});

let wolfNumber = reactive<{ name: string; num: int }[]>([]);

const resetReservation = () => {
  form.reservation.fill(0);
};

const onGenerateWave = () => {
  let result = generateWave(props.mid, [...form.reservation]);
  if (!result) {
    ElMessage.error("预留量不合法，请重新输入！");
    return;
  }
  let [mlist, clist] = result;
  if (form.extra) mlist = _.shuffle(mlist.concat(form.extra.split(",").map((s) => s.trim())));
  form.resultRaw = `[${mlist.map((t) => `"${t}"`).join(",")}]`;
  form.result = tr(mlist).join(",");
  wolfNumber = clist.map((t) => ({ name: tr(t[0]!), num: t[1]! }));
  form.count = _.sumBy(clist, (t) => t[1]);
};
</script>

<style lang="scss" scoped>
#wave-tool {
  margin-top: 20px;
  max-width: 720px;

  .el-button {
    padding: 6px;
  }
}
</style>
