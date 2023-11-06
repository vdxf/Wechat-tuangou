<template>
  <Table @request="handleRequest" ref="childRef">
    <template #actions>
      <el-button type="primary" plain :icon="Plus" @click="handleAddedOrUpdate()">新增</el-button>
    </template>

    <template #table="scope">
      <el-table
        ref="multipleTableRef"
        :data="scope.data"
        style="width: 100%"
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
              <el-button type="danger" link @click="handleDelete(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </Table>
  <el-dialog v-model="showDialog" :title="title" @close="handleCancle()">
    <el-form :model="form" :rules="rules" inline ref="formRef">
      <el-form-item prop="Name" label="名称">
          <el-input v-model="form.Name" placeholder="请填写商品名称"/>
      </el-form-item>
      <el-form-item label="编号">
          <el-input v-model="form.ProductNo" placeholder="请填写商品编号"/>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select v-model="form.BrandName" placeholder="请选择品牌" clearable>
          <el-option v-for="option in formOptions.brands" :key="option.Id" :label="option.Name" :value="option.Name" />
        </el-select>
      </el-form-item>
      <el-form-item label="小标题" prop="SubTitle">
          <el-input v-model="form.SubTitle" placeholder="请填写商品小标题"/>
      </el-form-item>
      <el-form-item label="模板图片(750 * 600)" prop="ProductModelImageUrl">
        <ImageUpload 
          v-model="form.ProductModelImageUrl"
        />
      </el-form-item>
      <el-form-item label="主图预览" >
        <img v-if="form.ProductModelImageUrl" :src="form.ProductImageUrl" alt="img">
      </el-form-item>
      <el-form-item label="规格说明" >
        <el-input v-model="form.Specification" placeholder="请填写规格说明" :maxlength="20" :showWordLimit="true"/>
      </el-form-item>
      <el-form-item label="开团日期" prop="OpenGroupId">
        <el-select v-model="form.OpenGroupId" placeholder="请选择开团日期" clearable>
          <el-option v-for="option in formOptions.openGroups" :key="option.Id" :label="option.Name" :value="option.Id" />
        </el-select>
      </el-form-item>
      <el-form-item label="商品轮播图(750 * 600)，最多上传10张" :style="{width: '90%'}">
        <BannerImage 
          v-model="form.ProductBannerImageUrl" :max="10"
        />
      </el-form-item>
      <el-form-item label="商品Banner视频" :style="{width: '100%'}">
        <VideoUpload
          :max="1"
          v-model="form.ProductBannerVideoUrl"
        />
      </el-form-item>
      <el-form-item label="团品实拍" :style="{width: '100%'}">
        <VideoUpload
          :max="5"
          v-model="video"
        />
      </el-form-item>
      <el-form-item label="分组" prop="BuyGroupName" :style="{width: '100%'}">
        <el-select v-model="buygroups" placeholder="请选择商品分组" clearable filterable multiple>
          <el-option v-for="option in formOptions.groups" :key="option.Id" :label="option.Name" :value="option.Name" />
        </el-select>
      </el-form-item>
      <el-form-item label="标签" :style="{width: '100%'}">
        <el-select v-model="tag" clearable filterable multiple multipleLimit="4">
          <el-option v-for="option in formOptions.tags" :key="option.Id" :label="option.Name" :value="option.Name" />
        </el-select>
      </el-form-item>
      <el-form-item label="单位" prop="Unit">
        <el-input v-model="form.Unit" placeholder="请填写商品单位"/>
      </el-form-item>
      <el-form-item label="团购价1（默认RMB）" prop="Price1">
        <Price v-model="form.Price1" :precision="2" :getSource="() => {
          return { way: 2, price: form.Price2 }
        }"/>
      </el-form-item>
      <el-form-item label="团购价2（新加坡币）">
        <Price v-model="form.Price2" :precision="2" :getSource="() => {
          return { way: 1, price: form.Price1 }
        }"/>
      </el-form-item>
      <el-form-item label="分销商差价" prop="RetailPrice">
        <el-input-number v-model="form.RetailPrice" :precision="2" :min="0" placeholder="请填写分销商差价" :style="{width: '70%'}" />
      </el-form-item>
      <el-form-item label="小批发商差价" prop="SmallWholesalePrice">
        <el-input-number v-model="form.SmallWholesalePrice" :precision="2" :min="0" placeholder="请填写小批发商差价" :style="{width: '70%'}" />
      </el-form-item>
      <el-form-item label="中批发商差价" prop="MiddleWholesalePrice">
        <el-input-number v-model="form.MiddleWholesalePrice" :precision="2" :min="0" placeholder="请填写中批发商差价" :style="{width: '70%'}" />
      </el-form-item>
      <el-form-item label="大批发商差价" prop="BigWholesalePrice">
        <el-input-number v-model="form.BigWholesalePrice" :precision="2" :min="0" placeholder="请填写大批发商差价" :style="{width: '70%'}" />
      </el-form-item>
      <el-form-item label="推广费用" prop="PromotionCost">
        <el-input-number v-model="form.PromotionCost" :precision="2" :min="0" placeholder="请填写商品推广费用" :style="{width: '70%'}" />
      </el-form-item>
      <el-form-item label="库存" prop="StockNum">
        <el-input-number v-model="form.StockNum" :min="0" placeholder="请填写商品库存" :style="{width: '70%'}" />
      </el-form-item>
      <el-form-item label="排序" prop="Sort">
        <el-input-number v-model="form.Sort" :min="0" placeholder="请填写排序" :style="{width: '70%'}" />
      </el-form-item>
      <el-form-item label="商品详情文案" :style="{width: '100%'}">
          <el-input type="textarea" v-model="form.DescriptionInfo" placeholder="请填写商品详情文案"/>
      </el-form-item>
      <el-form-item label="商品详情(最多上传25张)" :style="{width: '100%'}">
        <BannerImage 
          v-model="form.Description" :max="25"
        />
      </el-form-item>
      <el-form-item label="商品属性文案" :style="{width: '100%'}">
          <el-input type="textarea" v-model="form.DescriptionInfo" placeholder="请填写商品属性文案"/>
      </el-form-item>
      <el-form-item label="资质认证文案" :style="{width: '100%'}">
          <el-input type="textarea" v-model="form.DescriptionInfo" placeholder="请填写商品详情文案"/>
      </el-form-item>
      <el-form-item label="资质认证图片(最多上传5张)" :style="{width: '100%'}">
        <BannerImage 
          v-model="form.Credential" :max="5"
        />
      </el-form-item>
      <el-form-item label="关于售后文案" :style="{width: '100%'}">
          <el-input type="textarea" v-model="form.DescriptionInfo" placeholder="请填写关于售后文案"/>
      </el-form-item>
      <el-form-item label="关于售后图片(最多上传5张)" :style="{width: '100%'}">
        <BannerImage 
          v-model="form.AfterSales" :max="5"
        />
      </el-form-item>
      <el-form-item label="是否上架">
        <el-radio-group v-model="form.IsShelfed">
          <el-radio :label="true" size="large">是</el-radio>
          <el-radio :label="false" size="large" :style="{ marginLeft: '10px' }">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancle()">取消</el-button>
        <el-button type="primary" @click="handleSubmit()">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import ImageUpload from '@/components/FormDialog/ImageUpload.vue'
import BannerImage from '@/components/FormDialog/BannerListImage.vue'
import VideoUpload from '@/components/FormDialog/VideoUpload.vue'
import Price from '@/components/component/PriceNumber.vue'
import type { Brand, BuyGroup, OpenGroup, ProductModel } from '@/api/product/type'
import Table from '@/components/Table/TableView.vue'
import { Plus } from '@element-plus/icons-vue'
import { onBeforeMount, reactive, ref, watch } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { reqProductList, reqPostProduct, reqOpenGroupList,reqBuyGroupList, reqProductBrandList, reqProductTagList, reqDeleteProductInfo } from '@/api/product'
const childRef = ref()
const formRef = ref()
const handleRequest = async ([PageIndex, PageSize]: any, query: any) => {
 const { Data:res } = await reqProductList({PageIndex, PageSize, ...query})
 childRef.value.setData([res.Data, res.Count])
}
//排序
const handleSort =async (item: ProductModel, Sort:any) => {
  await reqPostProduct({...item, Sort})
}
//删除
const handleDelete = (e:any) => {
  ElMessageBox.confirm(
    '您确认要删除此项吗？',
    '温馨提示！',
    {
      confirmButtonText: '确认删除',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
  .then(async () => {
    await reqDeleteProductInfo({Id: e.Id})
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    childRef.value.handleReqTableList([1,10])
  })
  .catch(() => {
    ElMessage({
      type: 'info',
      message: '取消删除',
    })
  })
}
const title = ref<string>('')
const showDialog = ref<boolean>(false)
const video = ref([])
const buygroups = ref([])
const tag = ref([])
const form = reactive({
  Id: undefined,
  Name: '',
  ProductNo: '',
  BrandName: '',
  SubTitle: '',
  ProductModelImageUrl: '',
  ProductImageUrl: '',
  Specification: '',
  OpenGroupId: 0,
  ProductBannerImageUrl: '',
  ProductBannerVideoUrl: '',
  VideoUrls: '',
  BuyGroupName: '',
  Tags: '',
  Unit: '',
  Price1: 0,
  Price2: 0,
  RetailPrice: 0,
  SmallWholesalePrice: 0,
  MiddleWholesalePrice: 0,
  BigWholesalePrice: 0,
  PromotionCost: 0,
  StockNum: 0,
  Sort: 1,
  DescriptionInfo: '',
  Description: '',
  DescriptionAttri: '',
  CredentialInfo: '',
  Credential: '',
  AfterSalesInfo: '',
  AfterSales: '',
  IsShelfed: true
})
watch(
  () => [form.ProductModelImageUrl, video.value, buygroups.value, tag.value],
  (nv):any => { form.ProductImageUrl = nv[0] as string; form.VideoUrls = Array.prototype.join.call(nv[1], ';'); form.BuyGroupName = Array.prototype.join.call(nv[2], ';'); form.Tags = Array.prototype.join.call(nv[3], ';') },
  {
    immediate:true
  }
)
const rules = reactive({
  Name: [{ required: true, message: '请填写商品名称', trigger: 'blur' }],
  SubTitle: [{ required: true, message: '请填写商品小标题', trigger: 'blur' }],
  ProductModelImageUrl: [{ required: true, message: '请选择商品模板图片', trigger: 'blur' }],
  OpenGroupId: [{ required: true, message: '请选择开团日期', trigger: 'blur' }],
  BuyGroupName: [{ required: true, message: '请选择商品分组', trigger: 'blur' }],
  Unit: [{ required: true, message: '请填写商品单位', trigger: 'blur' }],
  Price1: [{ required: true, message: '请填写商品团购价', trigger: 'blur' }],
  RetailPrice: [{ required: true, message: '请填写分销商差价', trigger: 'blur' }],
  SmallWholesalePrice: [{ required: true, message: '请填写小批发商差价', trigger: 'blur' }],
  MiddleWholesalePrice: [{ required: true, message: '请填写中批发商差价', trigger: 'blur' }],
  BigWholesalePrice: [{ required: true, message: '请填写大批发商差价', trigger: 'blur' }],
  PromotionCost: [{ required: true, message: '请填写商品推广费用', trigger: 'blur' }],
  StockNum: [{ required: true, message: '请填写商品库存', trigger: 'blur' }],
  Sort: [{ required: true, message: '请填写排序', trigger: 'blur' }],
  IsShelfed: [{ required: true, message: '请选择是否上架', trigger: 'blur' }],
})
//新增 / 编辑
const handleAddedOrUpdate = (e?:any) => {
  showDialog.value = true
  title.value = e?.Id ? '编辑' : '新增'
  if (e?.Id) {
    Object.entries(e).forEach(([key, value]) => {
      form[key] = value
    })
  }
}
//获取分组
const formOptions = reactive<{
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
  formOptions.groups = groups.Data
  formOptions.tags = tags.Data
  formOptions.brands = brands.Data
  formOptions.openGroups = openGroups.Data
})
const handleCancle = () => {
  formRef.value.resetFields()
  form.Id = undefined
  showDialog.value = false
  console.log('form => ', form)
}
const handleSubmit = async () => {
  await reqPostProduct({...form})
  childRef.value.handleReqTableList([1,10])
  showDialog.value = false
  ElMessage.success('操作成功')
}
</script>
<style scoped lang="scss">
@import '@/assets/sass/global.scss';
.el-form {
  display: flex;
  flex-wrap: wrap;
  .el-form-item {
    display: block;
    width: 45%;
    margin-bottom: 20px;
  }
  .el-select {
    width: 100%;
  }
  img {
    display: block;
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
}
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