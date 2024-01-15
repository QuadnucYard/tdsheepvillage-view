<template>
  <el-card>
    <el-form label-width="100px">
      <el-form-item label="原型">
        <el-select-v2 v-model="protoId" :options="allTowerOptions" value-key="id" style="max-width: 150px" />
      </el-form-item>
      <el-form-item label="等级">
        <el-input-number v-model="tower.m_level" />
      </el-form-item>
      <!-- <el-form-item label="bId">
      <el-input />
    </el-form-item> -->
      <el-form-item label="damage">
        <div class="space-x-2">
          <span>
            a:
            <el-input-number
              v-model="tower.towerData.damageA"
              controls-position="right"
              :step="getStep(proto.damage.a)"
              style="width: 100px"
            />
          </span>
          <span>
            b:
            <el-input-number
              v-model="tower.towerData.damageB"
              controls-position="right"
              :step="getStep(proto.damage.b)"
              style="width: 100px"
            />
          </span>
          <span>
            c:
            <el-input-number
              v-model="tower.towerData.damageC"
              controls-position="right"
              :step="getStep(proto.damage.c)"
              style="width: 100px"
            />
          </span>
        </div>
      </el-form-item>
      <el-form-item label="rate">
        <el-input-number v-model="tower.towerData.rate" :step="getStep(proto.rate)" />
      </el-form-item>
      <el-form-item label="range">
        <el-input-number v-model="tower.towerData.range" :step="getStep(proto.range)" />
      </el-form-item>
      <el-form-item label="buffEffect">
        <el-input-number v-model="tower.towerData.buffEffect" :step="getStep(proto.buffEffect)" />
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { GlobalData, TowerId } from "@/tdsheep/ado/GlobalData";
import { TowerData } from "@/tdsheep/command/unit";
import { Tower } from "@/tdsheep/module/unit/Tower";
import { getStep } from "@/utils";
import { allTowerOptions } from "@/utils/ui-data";

const tower = defineModel<Tower>({ required: true });

const protoId = ref<TowerId>("shaota");
const proto = computed(() => GlobalData.$_towerAtt_Obj[protoId.value]);
watch(proto, (val) => {
  tower.value.m_data = new TowerData(val);
});
</script>

<style scoped></style>
