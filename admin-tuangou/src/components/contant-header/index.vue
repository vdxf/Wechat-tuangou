<template>
  <el-card class="card" body-style="display: flex; align-items: center; flex-wrap: wrap;">
    <el-input class="item" v-model="input" placeholder="请输入搜索关键词" clearable></el-input>
    <el-select v-model="value1" class="item" placeholder="请选择分组" size="default">
      <el-option
        v-for="item1 in options1"
        :key="item1.value"
        :label="item1.label"
        :value="item1.value"
      />
    </el-select>
    <el-select v-model="value2" class="item" placeholder="请选择是否上架" size="default">
        <el-option
          v-for="item2 in options2"
          :key="item2.value"
          :label="item2.label"
          :value="item2.value"
        />
    </el-select>
    <div class="block">
      <el-date-picker
        v-model="startDate"
        type="datetimerange"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
      />
    </div>
    <div class="block">
      <el-date-picker
      style="width: 180px;"
        v-model="openDate"
        type="datetime"
        placeholder="开团时间"
      />
    </div>
    <div class="btn-group">
      <el-button type="primary" :icon="Search" :loading="searchLoading">查询</el-button>
      <el-button :icon="RefreshRight">重置</el-button>
    </div>
  </el-card>
</template>
<script lang="ts" setup>
import { Search, RefreshRight } from '@element-plus/icons-vue'
import { ref } from 'vue'
const value1 = ref<string>('')
const value2 = ref<string>('')
const input = ref<string>('')
const searchLoading = ref<boolean>(false)
const options1 = [
  {
    value: '1',
    label: '新品区',
  },
  {
    value: '2',
    label: '加开区',
  },
  {
    value: '3',
    label: '日常区',
  },
  {
    value: '4',
    label: '展业区',
  }
]
const options2 = [
  {
    value: 'yes',
    label: '是',
  },
  {
    value: 'no',
    label: '否',
  }
]
const startDate = ref('')
const openDate = ref('')
</script>

<style scoped lang="scss">
.card {
  display: flex;
  margin-bottom: 20px;
}
.item {
  width: 180px;
  margin-top: 10px;
  margin-right: 15px;
}
.block {
  margin-top: 10px;
  margin-right: 10px;
}
.btn-group {
  margin-top: 10px;
  display: flex; 
  justify-content: space-between; 
  align-items: center;
}
</style>