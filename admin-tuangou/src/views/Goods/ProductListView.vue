<template>
  <Table @request="handleRequest" :data="data">
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
                <span>Id</span>
                <span>{{ scope.row.Id }}</span>
              </el-col>
              <el-col :span="12">
                <span>品牌</span>
                <span>{{ scope.row.BrandName }}</span>
              </el-col>
              <el-col :span="12">
                <span>编号</span>
                <span>{{ scope.row.ProductNo }}</span>
              </el-col>
              <el-col :span="12">
                <span>分组</span>
                <span>{{ scope.row.BuyGroupName }}</span>
              </el-col>
              <el-col :span="12">
                <span>小标题</span>
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
        <el-table-column prop="Name" label="商品" min-width="420px">
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
          <template #default="scope">
            <div class="edit-group">
              <el-button type="primary" link @click="handleAddedOrUpdate(scope.row)">编辑</el-button>
              <el-button type="warning" link @click="handleCopy">复制</el-button>
              <el-button type="danger" link @click="handleDelete(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </Table>
  <FormDialog :show="dialogShow" :formData="formData" ref="formDialog" @cancle="handleCancle" @submit="handleSubmit"></FormDialog>
</template>
<script lang="ts" setup>
import FormDialog from '@/components/FormDialog/index.vue'
import type { Brand, BuyGroup, OpenGroup, ProductModel } from '@/api/product/type'
import { ImageType, VideoType } from '@/utils/enums'
import Table from '@/components/Table/TableView.vue'
import { Plus, Edit } from '@element-plus/icons-vue'
import { onBeforeMount, reactive, ref } from 'vue';
import { reqProductList, reqPostProduct, reqOpenGroupList,reqBuyGroupList, reqProductBrandList, reqProductTagList } from '@/api/product'

const data = ref()
const handleRequest = async ([PageIndex, PageSize], query) => {
 const { Data:res } = await reqProductList({PageIndex, PageSize, ...query})
 data.value = [res.Data, res.Count]
}
//排序
const handleSort = (e:any) => {
  console.log('sort =>', e)
}
//批量修改
const checkedArr = ref<number[]>([])
const handleSelectionChange = (e:ProductModel[]) => {
  checkedArr.value = e.map((item) => item.Id)
}
const handleBatchUpdate = () => {

} 
//新增  / 编辑
const dialogShow = ref<boolean>(false)
const handleAddedOrUpdate = (e?:any) => {
  console.log('e => ', e)
  dialogShow.value = true
}
//复制
const handleCopy = () => {
  dialogShow.value = true
}
//删除
const handleDelete = (e:any) => {
  console.log('e => ', e)
  dialogShow.value = true
}
const handleCancle = () => {
  dialogShow.value = false
}
const handleSubmit = async () => {
  const { Data: res } = await reqPostProduct({
  })
  dialogShow.value = false
}
 //获取分组
 const mapOptions = reactive<{
    groups: BuyGroup[]
    tags: Brand[]
    brands: Brand[]
    openGroups: OpenGroup[]
  }>({
    groups: [],
    tags: [],
    brands: [],
    openGroups: [],
  })
  onBeforeMount(async () => {
    const [{ Data: groups }, { Data: tags }, { Data: brands }, { Data: openGroups }] =
      await Promise.all([
        reqBuyGroupList({ PageIndex: 1, PageSize: 99999 }),
        reqProductTagList({ PageIndex: 1, PageSize: 99999 }),
        reqProductBrandList({ PageIndex: 1, PageSize: 99999 }),
        reqOpenGroupList({ PageIndex: 1, PageSize: 99999 }),
      ])
    mapOptions.groups = groups
    mapOptions.tags = tags
    mapOptions.brands = brands
    mapOptions.openGroups = openGroups
  })
const formData = reactive({
  Name: {
    label: '名称',
    value: '',
    is: 'form-input',
    props: {
      placeholder: '请填写商品名称',
    },
    rules: [{ required: true, message: '请填写商品名称', trigger: 'blur' }],
  },
  ProductNo: {
    label: '编号',
    value: '',
    is: 'form-input',
    props: {
      placeholder: '请填写商品编号',
    },
  },
  BrandName: {
    label: '品牌',
    value: '',
    is: 'form-select',
    props: {
      placeholder: '请选择品牌',
    },
  },
  SubTitle: {
    label: '小标题',
    value: '',
    is: 'form-input',
    props: {
      placeholder: '请填写商品小标题',
    },
    rules: [{ required: true, message: '请填写商品小标题', trigger: 'blur' }],
  },
  ProductModelImageUrl: {
    label: '模板图片(750 * 600)',
    value: '',
    is: 'form-image-upload',
    width: '45%',
    props: {
      imageType: ImageType.GOODS,
    },
    rules: [{ required: true, message: '请选择商品模板图片', trigger: 'blur' }],
  },
  ProductImageUrl: {
    label: '主图预览',
    value: '',
    is: 'form-image-upload',
    width: '45%',
    props: {
      disabled: true,
      imageType: ImageType.GOODS,
    },
  },
  Specification: {
    label: '规格说明',
    value: '',
    is: 'form-input',
    props: {
      maxlength: 20,
      showWordLimit: true,
      placeholder: '请填写规格说明',
    },
  },
  OpenGroupId: {
    label: '开团日期',
    is: 'form-select',
    value: '',
    labelKey: 'Name',
    valueKey: 'Id',
    props: {
      filterable: true,
      placeholder: '请选择开团日期',
    },
    rules: [{ required: true, message: '请选择开团日期', trigger: 'blur' }],
  },
  ProductBannerImageUrl: {
    label: '商品轮播图(750 * 600)，最多上传10张',
    value: [],
    is: 'form-image-upload',
    get: (v) => v.join(';'),
    set: (d, f) => {
      f.value = d.ProductBannerImageUrl ? d.ProductBannerImageUrl.split(';') : []
    },
    props: {
      max: 10,
      imageType: ImageType.GOODS,
    },
  },
  ProductBannerVideoUrl: {
    label: '商品Banner视频',
    value: '',
    is: 'form-file-upload',
    props: {
      max: 1,
      fileType: VideoType.GOODS,
    },
  },
  VideoUrls: {
    label: '团品实拍',
    value: [],
    is: 'form-file-upload',
    get: (v) => v.join(';'),
    set: (d, f) => {
      f.value = d.VideoUrls ? d.VideoUrls.split(';') : []
    },
    props: {
      max: 5,
      fileType: VideoType.GOODS,
    },
  },
  BuyGroupName: {
    label: '分组',
    value: [],
    is: 'form-select',
    get: (v) => v.join(';'),
    set: (d, f) => {
      f.value = d.BuyGroupName ? d.BuyGroupName.split(';') : []
    },
    labelKey: 'Name',
    valueKey: 'Name',
    width: '100%',
    props: {
      filterable: true,
      multiple: true,
      placeholder: '请选择商品分组',
    },
    rules: [{ required: true, message: '请选择商品分组', trigger: 'blur' }],
  },
  Tags: {
    label: '标签',
    value: [],
    is: 'form-select',
    get: (v) => v.join(';'),
    set: (d, f) => {
      const v = d.Tags || ''
      f.value = v ? v.split(';') : []
    },
    options: [],
    labelKey: 'Name',
    valueKey: 'Name',
    width: '100%',
    props: {
      filterable: true,
      multiple: true,
      multipleLimit: 4,
    },
  },
  Unit: {
    label: '单位',
    value: '',
    is: 'form-input',
    props: {
      placeholder: '请填写商品单位',
    },
    rules: [{ required: true, message: '请填写商品单位', trigger: 'blur' }],
  },
  Price1: {
    label: '团购价1（默认RMB）',
    value: null,
    props: {
      min: 0,
      precision: 2,
      placeholder: '请填写商品团购价',
    },
    rules: [{ required: true, message: '请填写商品团购价', trigger: 'blur' }],
  },
  Price2: {
    label: '团购价2（新加坡币）',
    value: null,
    props: {
      min: 0,
      precision: 2,
      placeholder: '请填写商品团购价',
    },
  },
  RetailPrice: {
    label: '分销商差价',
    value: null,
    is: 'form-input-number',
    props: {
      min: 0,
      precision: 2,
      placeholder: '请填写分销商差价',
    },
    rules: [{ required: true, message: '请填写分销商差价', trigger: 'blur' }],
  },
  SmallWholesalePrice: {
    label: '小批发商差价',
    value: null,
    is: 'form-input-number',
    props: {
      min: 0,
      precision: 2,
      placeholder: '请填写小批发商差价',
    },
    rules: [{ required: true, message: '请填写小批发商差价', trigger: 'blur' }],
  },
  MiddleWholesalePrice: {
    label: '中批发商差价',
    value: null,
    is: 'form-input-number',
    props: {
      min: 0,
      precision: 2,
      placeholder: '请填写中批发商差价',
    },
    rules: [{ required: true, message: '请填写中批发商差价', trigger: 'blur' }],
  },
  BigWholesalePrice: {
    label: '大批发商差价',
    value: null,
    is: 'form-input-number',
    props: {
      min: 0,
      precision: 2,
      placeholder: '请填写大批发商差价',
    },
    rules: [{ required: true, message: '请填写大批发商差价', trigger: 'blur' }],
  },
  PromotionCost: {
    label: '推广费用',
    value: null,
    is: 'form-input-number',
    props: {
      min: 0,
      precision: 2,
      placeholder: '请填写商品推广费用',
    },
    rules: [{ required: true, message: '请填写商品推广费用', trigger: 'blur' }],
  },
  StockNum: {
    label: '库存',
    value: null,
    is: 'form-input-number',
    props: {
      min: 0,
      precision: 0,
      placeholder: '请填写商品库存',
    },
    rules: [{ required: true, message: '请填写商品库存', trigger: 'blur' }],
  },
  Sort: {
    label: '排序',
    value: 1,
    is: 'form-input-number',
    props: {
      placeholder: '请填写排序',
    },
    rules: [{ required: true, message: '请填写排序', trigger: 'blur' }],
  },
  DescriptionInfo: {
    label: '商品详情文案',
    value: '',
    is: 'form-input',
    width: '100%',
    props: {
      type: 'textarea',
      placeholder: '请填写商品详情文案',
    },
  },
  Description: {
    label: '商品详情(最多上传25张)',
    value: [],
    is: 'form-image-upload',
    get: (v) => v.join(';'),
    set: (d, f) => {
      f.value = d.Description ? d.Description.split(';') : []
    },
    props: {
      max: 25,
      imageType: ImageType.GOODS,
    },
  },
  DescriptionAttri: {
    label: '商品属性文案',
    value: '',
    is: 'form-input',
    width: '100%',
    props: {
      type: 'textarea',
      placeholder: '请填写商品属性文案',
    },
  },
  CredentialInfo: {
    label: '资质认证文案',
    value: '',
    is: 'form-input',
    width: '100%',
    props: {
      type: 'textarea',
      placeholder: '请填写商品详情文案',
    },
  },
  Credential: {
    label: '资质认证图片(最多上传5张)',
    value: [],
    is: 'form-image-upload',
    get: (v) => v.join(';'),
    set: (d, f) => {
      f.value = d.Credential ? d.Credential.split(';') : []
    },
    width: '100%',
    props: {
      max: 5,
      imageType: ImageType.GOODS,
    },
  },
  AfterSalesInfo: {
    label: '关于售后文案',
    value: '',
    is: 'form-input',
    width: '100%',
    props: {
      type: 'textarea',
      placeholder: '请填写关于售后文案',
    },
  },
  AfterSales: {
    label: '关于售后图片(最多上传5张)',
    value: [],
    is: 'form-image-upload',
    get: (v) => v.join(';'),
    set: (d, f) => {
      f.value = d.AfterSales ? d.AfterSales.split(';') : []
    },
    width: '100%',
    props: {
      max: 5,
      imageType: ImageType.GOODS,
    },
  },
  IsShelfed: {
    is: 'form-radio',
    value: '',
    label: '是否上架',
    options: [
      { label: '是', value: true },
      { label: '否', value: false },
    ],
    rules: [{ required: true, message: '请选择是否上架', trigger: 'blur' }],
  },
})

</script>
<style scoped lang="scss">
@import '@/assets/sass/global.scss';
.edit-group {
  .el-button {
    padding: 0;
    margin: 0;
    &:hover {
      opacity: 0.5;
    }
  }
}
.goods-data {
  display: flex;
  align-items: center;
  padding: 10px 0;
}
.goods-info {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  span {
    color: #333;
    white-space: nowrap;
  }
  p {
    color: 999px;
    font-size: 12px;
  }
}
</style>