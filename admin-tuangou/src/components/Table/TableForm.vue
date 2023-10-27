<template>
  <el-card class="card" body-style="display: flex; align-items: center; flex-wrap: wrap;">
    <el-input class="item" v-model="form.Keywords" placeholder="请输入搜索关键词" clearable></el-input>
    <el-select v-model="form.BuyGroupId" class="item" placeholder="请选择分组" size="default" v-if="show">
      <el-option
        v-for="item1 in options1"
        :key="item1.value"
        :label="item1.label"
        :value="item1.value"
      />
    </el-select>
    <el-select v-model="form.IsShelfed" class="item" placeholder="请选择是否上架" size="default" v-if="show">
        <el-option
          v-for="item2 in options2"
          :key="item2.value"
          :label="item2.label"
          :value="item2.value"
        />
    </el-select>
    <div class="block" v-if="show">
      <el-date-picker
        v-model="form.date"
        type="datetimerange"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        format="YYYY/MM/DD HH:mm:ss"
        value-format="YYYY-MM-DD HH:mm:ss"
      />
    </div>
    <div class="block" v-if="show">
      <el-date-picker
      style="width: 180px;"
        v-model="form.GroupDate"
        type="datetime"
        placeholder="开团时间"
        format="YYYY/MM/DD HH:mm:ss"
        value-format="YYYY-MM-DD HH:mm:ss"
      />
    </div>
    <div class="btn-group">
      <el-button type="primary" :icon="Search" :loading="loading" @click="$emit('search', form)">查询</el-button>
      <el-button :icon="RefreshRight" @click="handleClear">重置</el-button>
    </div>
  </el-card>
</template>
<script lang="ts" setup>
import { Search, RefreshRight } from '@element-plus/icons-vue'
import { onBeforeMount, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const show = ref<boolean>(true)
onBeforeMount(() => {
  if (route.path === '/goods/productList') {
    show.value = true
  } else {
    show.value = false
  }
})

console.log('route => ', route.path)
defineProps(['loading'])
let form = reactive({
  Keywords: '',
  BuyGroupId: '',
  IsShelfed: '',
  date: [],
  GroupDate: ''
})
const handleClear = () => {
  form.Keywords = ''
  form.BuyGroupId = ''
  form.IsShelfed = ''
  form.date = []
  form.GroupDate = ''
}
const options1 = [
  {
    value: '1',
    label: '新品区',
  },
  {
    value: '3',
    label: '加开区',
  },
  {
    value: '4',
    label: '日常区',
  },
  {
    value: '5',
    label: '展业区',
  }
]
const options2 = [
  {
    value: 'true',
    label: '是',
  },
  {
    value: 'false',
    label: '否',
  }
]
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