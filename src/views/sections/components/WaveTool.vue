<template>
  <div id="wave-tool">
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
        <el-button size="small">重置</el-button>
      </p>
      <table>
        <tbody>
          <tr>
            <td v-for="item in mapMonsterData">{{ item.name }}</td>
          </tr>
          <tr>
            <td v-for="(item, i) in mapMonsterData">
              <el-input-number
                v-model="form.reservation[i]"
                size="small"
                controls-position="right"
                :min="0"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        额外：<el-input
          v-model="form.extra"
          style="width: 580px"
          placeholder="多个请用半角逗号分隔"
        />
      </p>
      <p>波：<el-input v-model="form.resultRaw" style="width: 600px" /></p>
      <p>波：<el-input v-model="form.result" style="width: 600px" /></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { generateWave } from "@/utils/game-utils";
import { tr } from "@/utils/translate";
import { ElMessage } from "element-plus";
import _ from "lodash";

const props = defineProps<{ mid: int; mapMonsterData: any }>();

const form = reactive({
  count: 0,
  avgHp: "",
  reservation: [0, 0, 0, 0, 0, 0, 0],
  extra: "",
  result: "",
  resultRaw: "",
});

const onGenerateWave = () => {
  let result = generateWave(props.mid, null);
  if (!result) {
    ElMessage.error("预留量不合法，请重新输入！");
    return;
  }
  result = _.shuffle(result.concat(form.extra.split(",").map(s => s.trim())));
  form.resultRaw = `[${result.map(t => `"${t}"`).join(",")}]`;
  form.result = tr(result).join(",");
};
</script>

<style lang="scss"></style>
