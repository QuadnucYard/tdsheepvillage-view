<template>
  <el-card>
    <el-form label-width="100px">
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
              style="width: 100px"
            />
          </span>
          <span>
            b:
            <el-input-number
              v-model="tower.towerData.damageB"
              controls-position="right"
              style="width: 100px"
            />
          </span>
          <span>
            c:
            <el-input-number
              v-model="tower.towerData.damageC"
              controls-position="right"
              style="width: 100px"
            />
          </span>
        </div>
      </el-form-item>
      <el-form-item label="rate">
        <el-input-number v-model="tower.towerData.rate" />
      </el-form-item>
      <el-form-item label="range">
        <el-input-number v-model="tower.towerData.range" />
      </el-form-item>
      <el-form-item label="buffEffect">
        <el-input-number v-model="tower.towerData.buffEffect" />
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { Tower } from "@/tdsheep/module/unit/Tower";
import { getStep } from "@/utils";

const props = defineProps<{ tower: Tower }>();
</script>

<style scoped></style>
