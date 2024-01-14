<template>
  <el-card class="wave-tool">
    <h3>波工具</h3>
    <div class="space-y-2">
      <div>
        <el-button @click="onGenerateWave">随机生成波</el-button>
        <span>
          共
          <el-input-number v-model="form.count" size="small" style="width: 100px" />
          只狼，平均血量
          <el-input v-model.number="form.avgHp" style="width: 100px" />
        </span>
        <!-- <el-button>组成推算</el-button> -->
      </div>

      <div>
        <label>下表为预留量</label>
        <el-button size="small" @click="resetReservation">重置</el-button>
      </div>
      <table class="text-center markup-table">
        <tbody>
          <tr>
            <td v-for="item in mapMonsterData" :key="item.id">{{ item.name }}</td>
          </tr>
          <tr>
            <td v-for="(item, i) in mapMonsterData" :key="item.id">
              <el-input-number v-model="form.reservation[i]" size="small" :min="0" style="width: 80px" />
            </td>
          </tr>
        </tbody>
      </table>

      <div>
        额外：<el-input
          v-model="form.extra"
          placeholder="多个请用半角逗号分隔"
          :spellcheck="false"
          style="width: calc(100% - 60px)"
        />
      </div>
      <div>
        波：
        <el-input v-model="form.resultRaw" style="width: calc(100% - 75px)" :spellcheck="false" />
        <el-button :icon="DocumentCopy" @click="copyToClipboard(form.resultRaw)" />
      </div>
      <div>
        波：
        <el-input v-model="form.result" style="width: calc(100% - 75px)" :spellcheck="false" />
        <el-button :icon="DocumentCopy" @click="copyToClipboard(form.result)" />
      </div>

      <WolfNumberChart :data="wolfNumber" :max="10" />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { DocumentCopy } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import _ from "lodash-es";
import useClipboard from "vue-clipboard3";

import { GameMapData } from "@/tdsheep/command/map";
import { MonsterData, MonsterManager } from "@/tdsheep/command/unit";
import { generateWave } from "@/utils/game-utils";
import { tr } from "@/utils/translate";
import WolfNumberChart from "@/views/components/WolfNumberChart.vue";

const { toClipboard } = useClipboard();
const copyToClipboard = async (text?: string) => {
  if (!text) return;
  await toClipboard(text);
  ElMessage.success("已复制到剪贴板");
};

const props = defineProps<{ mapData: GameMapData; mapMonsterData: MonsterData[]; level: int; diff: int }>();

const form = reactive({
  count: 0,
  avgHp: 0,
  reservation: new Array<int>(20).fill(0),
  extra: "",
  result: "",
  resultRaw: "",
});

const wolfNumber = ref<{ name: string; num: int }[]>([]);

const initData = () => {
  Object.assign(form, {
    count: 0,
    avgHp: 0,
    resetReservation: props.mapData.monsterProportion.map(() => 0),
    extra: "",
    result: "",
    resultRaw: "",
  });
  wolfNumber.value = [];
};

watch(() => props.mapData, initData);

const resetReservation = () => {
  form.reservation.fill(0);
};

const onGenerateWave = () => {
  let result = generateWave(props.mapData, form.reservation);
  if (!result) {
    ElMessage.error("预留量不合法，请重新输入！");
    return;
  }
  let { mlist, clist } = result;
  if (form.extra) mlist = _.shuffle(mlist.concat(form.extra.split(",").map((s) => MonsterManager.get(s.trim()))));
  form.resultRaw = JSON.stringify(mlist.map((t) => t.id));
  form.result = mlist.map((t) => tr(t.id)).join(", ");
  wolfNumber.value = clist.map((t) => ({ name: tr(t.data.id), num: t.num }));
  form.count = _.sumBy(clist, (t) => t.num);
  form.avgHp = Math.round(_.sumBy(mlist, (t) => t.getHpMax(props.level, props.diff)) / mlist.length);
};
</script>

<style lang="scss" scoped>
.wave-tool {
  margin-top: 20px;
  max-width: 720px;

  .el-button {
    padding: 6px;
  }
}
</style>
