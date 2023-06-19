<template>
  <div>
    <el-table :data="baoxiangList" style="font-size: small">
      <el-table-column label="id" prop="id" :width="120" />
      <el-table-column label="name" prop="name" :width="160" />
      <!-- <el-table-column label="price" prop="price"/> -->
      <el-table-column label="open_num" prop="open_num" :width="100" />
      <el-table-column label="info" prop="info" :width="400" />
      <el-table-column label="data">
        <template #default="scope">
          <ul v-if="scope.row.default_gift">
            <template v-for="(v, k) in scope.row.default_gift">
              <li v-if="k == 'properties'">
                <el-tag type="warning">{{ k }}</el-tag>
                <ul class="ml-4">
                  <li v-for="(v2, k2) in v">
                    <el-tag>{{ k2 }}</el-tag>
                    <el-tag v-for="(v3, k3) in v2" type="info" :title="k3">
                      {{ tr(k3) }}: {{ v3 }}
                    </el-tag>
                  </li>
                </ul>
              </li>
              <li v-else>
                <el-tag type="warning">{{ k }}</el-tag>
                <el-tag type="info">{{ v }}</el-tag>
              </li>
            </template>
          </ul>
          <ul v-if="scope.row.data">
            <template v-for="u in scope.row.data">
              <li v-if="u[1] == 'invite_score'">
                <el-tag type="success">{{ u[0] }}</el-tag>
                <el-tag type="warning">{{ u[1] }}</el-tag>
                <el-tag>{{ u[2] }}</el-tag>
              </li>
              <li v-if="u[1] == 'properties'">
                <el-tag type="success">{{ u[0] }}</el-tag>
                <el-tag type="warning">{{ u[1] }}</el-tag>
                <ul class="ml-4">
                  <li v-for="v in u[2]">
                    <el-tag type="success">{{ v[0] }}</el-tag>
                    <el-tag type="warning">{{ v[1] }}</el-tag>
                    <el-tag>
                      <el-tag v-for="s in v[2]" :title="s" type="info">
                        {{ tr(s) }}
                      </el-tag>
                    </el-tag>
                  </li>
                </ul>
              </li>
            </template>
          </ul>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { GlobalData } from "@/tdsheep/ado/GlobalData";
import _ from "lodash-es";
import { adjacentDifference } from "@/utils";
import { tr } from "@/utils/translate";

const baoxiangList = _.chain(GlobalData.$_global_properties.card)
  .values()
  .filter(t => t.id.startsWith("baoxiang"))
  .sortBy(t => Math.abs(t.index))
  .value();

/*
 _.chain(scope.row.data)
                .unzip()
                .map((u, i) => (i == 0 ? adjacentDifference(u) : u))
                .unzip()
                .value()
  */
</script>

<style lang="scss"></style>
