<template>
  <ProTable :request="handleRequest" :query-metadata="queryMetadata" ref="proTableInstance">
    <template #actions>
      <ElButton
        type="warning"
        plain
        icon="Edit"
        :disabled="!ids.length"
        @click="handleBatchUpdate()"
      >
        批量处理
      </ElButton>
      <ElButton type="primary" plain icon="Plus" @click="handleAddedOrUpdate()">新增</ElButton>
    </template>

    <template #table="scope">
      <ElTable
        ref="elTableInstance"
        stripe
        table-layout="fixed"
        :data="scope.data"
        @selection-change="handleSelectionChange"
        @sort-change="handleSortChange"
      >
        <ElTableColumn type="selection" width="55" />

        <ElTableColumn type="expand">
          <template #default="scope">
            <ElRow :gutter="20">
              <ElCol :span="12">
                <span>Id</span>
                <span>{{ scope.row.Id }}</span>
              </ElCol>
              <ElCol :span="12">
                <span>品牌</span>
                <span>{{ scope.row.BrandName }}</span>
              </ElCol>
              <ElCol :span="12">
                <span>编号</span>
                <span>{{ scope.row.ProductNo }}</span>
              </ElCol>
              <ElCol :span="12">
                <span>分组</span>
                <span>{{ scope.row.BuyGroupName }}</span>
              </ElCol>
              <ElCol :span="12">
                <span>小标题</span>
                <span>{{ scope.row.SubTitle }}</span>
              </ElCol>
              <ElCol :span="12">
                <span>商品Banner图片</span>
                <span>
                  <ElImage
                    v-for="(item, index) in scope.row.ProductBannerImageUrl?.split(';') ?? []"
                    :key="index"
                    :src="item"
                    :preview-src-list="scope.row.ProductBannerImageUrl?.split(';') ?? []"
                    :initial-index="index"
                    fit="cover"
                    preview-teleported
                  />
                </span>
              </ElCol>
              <ElCol :span="12">
                <span>商品Banner视频</span>
                <span>
                  <a :href="scope.row.ProductBannerVideoUrl" target="_blank">
                    {{ scope.row.ProductBannerVideoUrl }}
                  </a>
                </span>
              </ElCol>
              <ElCol :span="12">
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
              </ElCol>
              <ElCol :span="12">
                <span>标签</span>
                <span>{{ scope.row.Tags }}</span>
              </ElCol>
              <ElCol :span="12">
                <span>开团日期</span>
                <span>{{ scope.row.GroupDate }} ~ {{ scope.row.GroupEndDate }}</span>
              </ElCol>
              <ElCol :span="12">
                <span>规格说明</span>
                <span>{{ scope.row.Specification }}</span>
              </ElCol>
              <ElCol :span="12">
                <span>小标题</span>
                <span>{{ scope.row.SubTitle }}</span>
              </ElCol>
              <ElCol :span="12">
                <span>单位</span>
                <span>{{ scope.row.Unit }}</span>
              </ElCol>
              <ElCol :span="12">
                <span>团购价1（默认RMB）</span>
                <span>{{ scope.row.Price1 }}</span>
              </ElCol>
              <ElCol :span="12">
                <span>团购价2（新加坡币）</span>
                <span>{{ scope.row.Price2 }}</span>
              </ElCol>
              <ElCol :span="12">
                <span>分销商差价</span>
                <span>{{ scope.row.RetailPrice }}</span>
              </ElCol>
              <ElCol :span="12">
                <span>小批发商差价</span>
                <span>{{ scope.row.SmallWholesalePrice }}</span>
              </ElCol>
              <ElCol :span="12">
                <span>中批发商差价</span>
                <span>{{ scope.row.MiddleWholesalePrice }}</span>
              </ElCol>
              <ElCol :span="12">
                <span>大批发商差价</span>
                <span>{{ scope.row.BigWholesalePrice }}</span>
              </ElCol>
              <ElCol :span="12">
                <span>推广费用</span>
                <span>{{ scope.row.PromotionCost }}</span>
              </ElCol>
              <ElCol :span="12">
                <span>库存</span>
                <span>{{ scope.row.StockNum }}</span>
              </ElCol>
              <ElCol :span="12">
                <span>排序</span>
                <span>{{ scope.row.Sort }}</span>
              </ElCol>
              <ElCol :span="12">
                <span>商品属性文案</span>
                <span>{{ scope.row.DescriptionInfo }}</span>
              </ElCol>
              <ElCol :span="12">
                <span>商品详情文案</span>
                <span>{{ scope.row.DescriptionInfo }}</span>
              </ElCol>
              <ElCol :span="12">
                <span>商品详情</span>
                <span>
                  <ElImage
                    v-for="(item, index) in scope.row.Description?.split(';') ?? []"
                    :key="index"
                    :src="item"
                    :preview-src-list="scope.row.Description?.split(';') ?? []"
                    :initial-index="index"
                    fit="cover"
                    preview-teleported
                  />
                </span>
              </ElCol>
              <ElCol :span="12">
                <span>资质认证</span>
                <span>
                  <ElImage
                    v-for="(item, index) in scope.row.Credential?.split(';') ?? []"
                    :key="index"
                    :src="item"
                    :preview-src-list="scope.row.Credential?.split(';') ?? []"
                    :initial-index="index"
                    fit="cover"
                    preview-teleported
                  />
                </span>
              </ElCol>
              <ElCol :span="12">
                <span>资质认证文案</span>
                <span>{{ scope.row.CredentialInfo }}</span>
              </ElCol>
              <ElCol :span="12">
                <span>关于售后文案</span>
                <span>{{ scope.row.AfterSalesInfo }}</span>
              </ElCol>
              <ElCol :span="12">
                <span>关于售后</span>
                <span>
                  <ElImage
                    v-for="(item, index) in scope.row.AfterSales?.split(';') ?? []"
                    :key="index"
                    :src="item"
                    :preview-src-list="scope.row.AfterSales?.split(';') ?? []"
                    :initial-index="index"
                    fit="cover"
                    preview-teleported
                  />
                </span>
              </ElCol>
            </ElRow>
          </template>
        </ElTableColumn>

        <ElTableColumn prop="Name" label="商品" min-width="420px">
          <template #default="scope">
            <div class="goods-data">
              <ElImage
                style="width: 50px; height: 50px"
                :src="scope.row.ProductImageUrl"
                :preview-src-list="[scope.row.ProductImageUrl]"
                fit="cover"
                preview-teleported
              />
              <div class="goods-info">
                <span :title="scope.row.Name">{{ scope.row.Name }}</span>
                <p>
                  开团时间：{{ formatDate(scope.row.GroupDate) }} ~
                  {{ formatDate(scope.row.GroupEndDate) }}
                </p>
              </div>
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="BuyGroupName" label="排序" width="180px">
          <template #default="scope">
            <ElInputNumber
              :model-value="scope.row.Sort"
              @update:model-value="handleSort(scope.row, $event)"
            />
          </template>
        </ElTableColumn>
        <ElTableColumn prop="Price1" sortable="custom" label="团购价1" width="100px" />
        <ElTableColumn label="是否上架" width="80px">
          <template #default="scope">
            <ElTag :type="scope.row.IsShelfed ? 'success' : 'info'">
              {{ scope.row.IsShelfed ? '是' : '否' }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="创建时间" sortable="custom" prop="CreatedDate" width="180px">
          <template #default="scope">
            {{ formatDate(scope.row.CreatedDate) }}
          </template>
        </ElTableColumn>

        <ElTableColumn fixed="right" label="操作" width="80px">
          <template #default="scope">
            <ElButton link type="primary" @click="handleAddedOrUpdate(scope.row, 'edit')">
              编辑
            </ElButton>
            <br />
            <ElButton link type="warning" @click="handleAddedOrUpdate(scope.row, 'copy')">
              复制
            </ElButton>
            <br />
            <ElButton link type="danger" @click="handleDelete(scope.row)">删除</ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
    </template>
  </ProTable>

  <ProDialogForm ref="proDialogFormInstance" />
</template>

<script setup lang="ts">
  import {
    doGoodsAddedUpdate,
    doGoodsBatchUpdate,
    doGoodsDelete,
    doImageUpload,
    reqBrandList,
    reqGoodsList,
    reqGroupList,
    reqOpenGroupList,
    reqTagList,
  } from '@/api'
  import { useProDialogForm, useProTable, type ProDialogFormMetadata } from '@/components'
  import type { BrandItem, GoodsItem, GroupItem, OpenGroupItem, TagItem } from '@/types'
  import { ImageType, VideoType } from '@/utils'
  import { formatDate, isEmptyObject, debounce } from '@daysnap/utils'
  import { ElTable } from 'element-plus'
  import banana from '@daysnap/banana'
  import PriceInputNumber from './components/PriceInputNumber.vue'
  import { generatorGoodsImage } from './draw'

  // 列表
  const [queryMetadata, proTableInstance, handleRequest] = useProTable(
    {
      Keywords: {
        is: 'form-input',
        value: '',
        props: {
          placeholder: '请填写搜索关键词',
        },
      },
      BuyGroupId: {
        is: 'form-select',
        value: '',
        options: [],
        labelKey: 'Name',
        valueKey: 'Id',
        props: {
          placeholder: '请选择分组',
        },
      },
      IsShelfed: {
        is: 'form-select',
        value: '',
        options: [
          { label: '是', value: true },
          { label: '否', value: false },
        ],
        props: {
          placeholder: '请选择是否上架',
        },
      },
      date: {
        is: 'form-date-picker',
        value: [],
        get: (v) => {
          const [StartDate, EndDate] = v
          return { StartDate, EndDate }
        },
        props: {
          type: 'datetimerange',
          startPlaceholder: '开始时间',
          endPlaceholder: '结束时间',
        },
      },
      GroupDate: {
        is: 'form-date-picker',
        value: '',
        props: {
          type: 'datetime',
          placeholder: '开团时间',
        },
      },
    },
    async ([PageIndex, PageSize], query) => {
      const { Data, Count } = await reqGoodsList({
        PageIndex,
        PageSize,
        ...query,
        ...sortRef.value,
      })
      return [Data, Count]
    },
  )

  const handleSort = debounce(async (item: GoodsItem, Sort: any) => {
    await doGoodsAddedUpdate({ ...item, Sort })
  }, 300)
  const sortRef = ref<Record<string, any>>({})
  const handleSortChange = ({ prop, order }: { prop: string; order?: string }) => {
    const sort: Record<string, any> = {}
    const map: Record<string, any> = { Price1: 'PriceSort', CreatedDate: 'DateSort' }
    if (order) {
      sort[map[prop]] = order === 'ascending' ? 0 : 1
    }
    sortRef.value = sort
    proTableInstance.value.reload()
  }

  // 获取分组
  const mapOptions = reactive<{
    groups: GroupItem[]
    tags: TagItem[]
    brands: BrandItem[]
    openGroups: OpenGroupItem[]
  }>({
    groups: [],
    tags: [],
    brands: [],
    openGroups: [],
  })
  onBeforeMount(async () => {
    const [{ Data: groups }, { Data: tags }, { Data: brands }, { Data: openGroups }] =
      await Promise.all([
        reqGroupList({ PageIndex: 1, PageSize: 99999 }),
        reqTagList({ PageIndex: 1, PageSize: 99999 }),
        reqBrandList({ PageIndex: 1, PageSize: 99999 }),
        reqOpenGroupList({ PageIndex: 1, PageSize: 99999 }),
      ])
    mapOptions.groups = groups
    mapOptions.tags = tags
    mapOptions.brands = brands
    mapOptions.openGroups = openGroups
    queryMetadata.BuyGroupId.options = groups
  })

  // 编辑 or 新增
  const metadataRef = ref<any>()
  watch(
    () => metadataRef.value,
    async (nv) => {
      const options = banana.extract(nv)
      const base64 = await generatorGoodsImage(options, mapOptions.openGroups)
      if (base64) {
        nv.ProductImageUrl.value = base64
      }
    },
    { deep: true },
  )
  const [proDialogFormInstance, handleAddedOrUpdate] = useProDialogForm<GoodsItem>(
    () => {
      const objForm: ProDialogFormMetadata = {
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
          labelKey: 'Name',
          valueKey: 'Name',
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
          is: markRaw(PriceInputNumber),
          getSource: () => {
            return { way: 2, price: objForm.Price2.value }
          },
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
          is: markRaw(PriceInputNumber),
          getSource: () => {
            return { way: 1, price: objForm.Price1.value }
          },
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
      }
      return objForm
    },
    async (metadata, withBanana, item, type) => {
      metadata.BuyGroupName.options = mapOptions.groups
      metadata.Tags.options = mapOptions.tags
      metadata.BrandName.options = mapOptions.brands
      // 开团日期
      metadata.OpenGroupId.options = mapOptions.openGroups
      metadataRef.value = metadata
      await proDialogFormInstance.value.show({
        title: type === 'copy' ? '复制商品' : item ? '编辑商品' : '新增商品',
        metadata,
        request: withBanana(async (params) => {
          // 先上传图片
          const base64 = (await generatorGoodsImage(params as any, mapOptions.openGroups)) as string
          const ProductImageUrl = await doImageUpload({
            Basic: base64.split(',')[1],
            ImageType: ImageType.GOODS,
            Suffix: `.jpeg`,
          })
          const options = { ...item, ...params, ProductImageUrl }
          if (type === 'copy') {
            delete options.Id
          }
          return doGoodsAddedUpdate(options)
        }),
      })
      proTableInstance.value.reload()
      ElMessage.success('操作成功')
    },
  )

  // 批量修改
  const ids = ref<number[]>([])
  const elTableInstance = ref<InstanceType<typeof ElTable>>()
  const handleSelectionChange = (selects: GoodsItem[]) => {
    ids.value = selects.map((item) => item.Id)
  }
  const [, handleBatchUpdate] = useProDialogForm(
    () => ({
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
      IsShelfed: {
        is: 'form-radio',
        value: void 0,
        label: '是否上架',
        options: [
          { label: '是', value: true },
          { label: '否', value: false },
        ],
      },
    }),
    async (metadata, withBanana) => {
      // 开团日期
      metadata.OpenGroupId.options = mapOptions.openGroups
      await proDialogFormInstance.value.show({
        title: '批量复用',
        metadata,
        request: withBanana(async (params: any) => {
          if (isEmptyObject(params)) {
            throw '请选择批量操作'
          }
          return doGoodsBatchUpdate({ ...params, Ids: ids.value })
        }),
      })
      proTableInstance.value.reload()
      ElMessage.success('操作成功')
    },
  )

  // 删除
  const handleDelete = async (item: GoodsItem) => {
    await ElMessageBox.confirm(`确认删除该数据？`)

    const { Id } = item
    await doGoodsDelete({ Id })
    proTableInstance.value.reload()
  }
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/define';
  .goods-data {
    @extend %df;
    @extend %aic;
    padding: 10px 0;
  }
  .goods-info {
    @extend %df1;
    margin-left: 10px;
    span {
      @extend %c3;
      @include twno(2);
    }
    p {
      @extend %c9;
      font-size: 12px;
    }
  }
</style>
