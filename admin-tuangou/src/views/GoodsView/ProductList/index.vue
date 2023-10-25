<template>
  <Table>
    <template #actions>
      <el-button type="warning" plain :icon="Edit" @click="handleBatchUpdate()" :disabled="!checkedArr.length">批量处理</el-button>
      <el-button type="primary" plain :icon="Plus" @click="handleAddedOrUpdate()">新增</el-button>
    </template>

    <template #table="scope">
      <el-table
        ref="multipleTableRef"
        :data="scope.data"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column type="expand" width="48">
          <template #default="scope">
            <el-row :gutter="20">
              <el-col :span="12">
                <span>Id: </span>
                <span>{{ scope.row.Id }}</span>
              </el-col>
              <el-col :span="12">
                <span>品牌: </span>
                <span>{{ scope.row.BrandName }}</span>
              </el-col>
              <el-col :span="12">
                <span>编号: </span>
                <span>{{ scope.row.ProductNo }}</span>
              </el-col>
              <el-col :span="12">
                <span>分组: </span>
                <span>{{ scope.row.BuyGroupName }}</span>
              </el-col>
              <el-col :span="12">
                <span>小标题: </span>
                <span>{{ scope.row.SubTitle }}</span>
              </el-col>
              <el-col :span="12">
                <span>商品Banner图片</span>
                <span>
                  <el-image
                    v-for="(item, index) in scope.row.ProductBannerImageUrl?.split(';') ?? []"
                    :key="index"
                    :src="item"
                    :preview-src-list="scope.row.ProductBannerImageUrl?.split(';') ?? []"
                    :initial-index="index"
                    fit="cover"
                    preview-teleported
                  />
                </span>
              </el-col>
              <el-col :span="12">
                <span>商品Banner视频</span>
                <span>
                  <a :href="scope.row.ProductBannerVideoUrl" target="_blank">
                    {{ scope.row.ProductBannerVideoUrl }}
                  </a>
                </span>
              </el-col>
              <el-col :span="12">
                <span>团品实拍</span>
                <span>
                  <a
                    v-for="(item, index) in scope.row.VideoUrls?.split(';') ?? []"
                    :key="index"
                    :href="item"
                    target="_blank"
                  >
                    {{ item }}
                  </a>
                </span>
              </el-col>
              <el-col :span="12">
                <span>标签</span>
                <span>{{ scope.row.Tags }}</span>
              </el-col>
              <el-col :span="12">
                <span>开团日期</span>
                <span>{{ scope.row.GroupDate }} ~ {{ scope.row.GroupEndDate }}</span>
              </el-col>
              <el-col :span="12">
                <span>规格说明</span>
                <span>{{ scope.row.Specification }}</span>
              </el-col>
              <el-col :span="12">
                <span>小标题</span>
                <span>{{ scope.row.SubTitle }}</span>
              </el-col>
              <el-col :span="12">
                <span>单位</span>
                <span>{{ scope.row.Unit }}</span>
              </el-col>
              <el-col :span="12">
                <span>团购价1（默认RMB）</span>
                <span>{{ scope.row.Price1 }}</span>
              </el-col>
              <el-col :span="12">
                <span>团购价2（新加坡币）</span>
                <span>{{ scope.row.Price2 }}</span>
              </el-col>
              <el-col :span="12">
                <span>分销商差价</span>
                <span>{{ scope.row.RetailPrice }}</span>
              </el-col>
              <el-col :span="12">
                <span>小批发商差价</span>
                <span>{{ scope.row.SmallWholesalePrice }}</span>
              </el-col>
              <el-col :span="12">
                <span>中批发商差价</span>
                <span>{{ scope.row.MiddleWholesalePrice }}</span>
              </el-col>
              <el-col :span="12">
                <span>大批发商差价</span>
                <span>{{ scope.row.BigWholesalePrice }}</span>
              </el-col>
              <el-col :span="12">
                <span>推广费用</span>
                <span>{{ scope.row.PromotionCost }}</span>
              </el-col>
              <el-col :span="12">
                <span>库存</span>
                <span>{{ scope.row.StockNum }}</span>
              </el-col>
              <el-col :span="12">
                <span>排序</span>
                <span>{{ scope.row.Sort }}</span>
              </el-col>
              <el-col :span="12">
                <span>商品属性文案</span>
                <span>{{ scope.row.DescriptionInfo }}</span>
              </el-col>
              <el-col :span="12">
                <span>商品详情文案</span>
                <span>{{ scope.row.DescriptionInfo }}</span>
              </el-col>
              <el-col :span="12">
                <span>商品详情</span>
                <span>
                  <el-image
                    v-for="(item, index) in scope.row.Description?.split(';') ?? []"
                    :key="index"
                    :src="item"
                    :preview-src-list="scope.row.Description?.split(';') ?? []"
                    :initial-index="index"
                    fit="cover"
                    preview-teleported
                  />
                </span>
              </el-col>
              <el-col :span="12">
                <span>资质认证</span>
                <span>
                  <el-image
                    v-for="(item, index) in scope.row.Credential?.split(';') ?? []"
                    :key="index"
                    :src="item"
                    :preview-src-list="scope.row.Credential?.split(';') ?? []"
                    :initial-index="index"
                    fit="cover"
                    preview-teleported
                  />
                </span>
              </el-col>
              <el-col :span="12">
                <span>资质认证文案</span>
                <span>{{ scope.row.CredentialInfo }}</span>
              </el-col>
              <el-col :span="12">
                <span>关于售后文案</span>
                <span>{{ scope.row.AfterSalesInfo }}</span>
              </el-col>
              <el-col :span="12">
                <span>关于售后</span>
                <span>
                  <el-image
                    v-for="(item, index) in scope.row.AfterSales?.split(';') ?? []"
                    :key="index"
                    :src="item"
                    :preview-src-list="scope.row.AfterSales?.split(';') ?? []"
                    :initial-index="index"
                    fit="cover"
                    preview-teleported
                  />
                </span>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column prop="Name" label="商品" width="500">
          <template #default="scope">
            <div class="goods-data">
              <el-image
                style="width: 50px; height: 50px"
                :src="scope.row.ProductImageUrl"
                :preview-src-list="[scope.row.ProductImageUrl]"
                fit="cover"
                preview-teleported
              />
              <div class="goods-info">
                <span :title="scope.row.Name">{{ scope.row.Name }}</span>
                <p>
                  开团时间：{{ scope.row.GroupDate}} ~
                  {{ scope.row.GroupEndDate }}
                </p>
                  </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="BuyGroupName" label="排序" width="180">
          <template #default="scope">
            <el-input-number v-model="scope.row.Sort" :min="1" :max="10" @change="handleSort(scope.row, $event)" />
          </template>
        </el-table-column>
        <el-table-column prop="Price1" label="团购价1" sortable="custom" width="100"></el-table-column>
        <el-table-column label="是否上架" width="80">
          <template #default="scope">
            <el-tag :type="scope.row.IsShelfed ? 'success' : 'info'">{{ scope.row.IsShelfed ? '是' : '否' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="CreatedDate" label="创建时间" sortable="custom" width="180">
          <template #default="scope">
            {{ scope.row.CreatedDate }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="80">
          <template #default>
            <div class="edit-group">
              <el-button type="primary" link>编辑</el-button>
              <el-button type="warning" link>复制</el-button>
              <el-button type="danger" link>删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </Table>
</template>
<script lang="ts" setup>
import type { ProductModel } from '@/api/product/type'
import Table from '@/components/TableView/index.vue'
import { Plus, Edit } from '@element-plus/icons-vue'
import { ref } from 'vue';
//排序
const handleSort = (e:any) => {
  console.log('sort =>', e)
}
//批量修改
const checkedArr = ref<number[]>([])
const handleSelectionChange = (e:ProductModel[]) => {
  checkedArr.value = e.map((item) => item.Id)
  console.log(typeof checkedArr.value)
}
const handleBatchUpdate = () => {

}
//新增
const handleAddedOrUpdate = () => {
  
}

</script>
<style scoped lang="scss">
.edit-group {
  .el-button {
    padding: 0;
    margin: 0;
    &:hover {
      opacity: 0.5;
    }
  }
}
</style>