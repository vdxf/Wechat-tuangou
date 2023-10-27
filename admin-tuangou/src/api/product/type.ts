export interface Response {
  Status: number,
  Message: string,
  Id: string,
  Extend: string,
}

export interface PageParams {
  PageIndex: number,
  PageSize: number,
  Keywords?: string,
  StartDate?: string,
  EndDate?: string,
  DateSort?: number,
  NameSort?: number,
}
export interface GroupItem {
  CreatedDate: string
  LastModified: string
  IsSuspent: boolean
  IsDeleted: boolean
  DbOperateType: number
  Id: number
  Name: string
  SimpleName: string
  Sort: number
}
export interface TagItem {
  Id: number
  Name: string
  CreatedDate: string
  Sort: number
}
export interface BrandItem {
  CreatedDate: string
  LastModified: string
  IsSuspent: boolean
  IsDeleted: boolean
  DbOperateType: number
  Id: number
  Name: string
  Sort: number
}
export interface OpenGroupItem {
  CreatedDate: string
  LastModified: string
  IsSuspent: boolean
  IsDeleted: boolean
  DbOperateType: number
  Id: number
  Name: string
  GroupDate: string
  GroupEndDate: string
}

//获取商品列表数据类型
export interface GetProductList extends PageParams {
  BuyGroupId?: number,
  BuyGroupName?: string,
  GroupDate?:  string,
  IsShelfed?: boolean,
  PriceSort?: number,
  ProductNoSort?: number
}

//获取商品列表返回数据类型
export interface ProductAttribute {
  Id?: string,
  CreateDate?: string,
  Name?: string,
  DbOperateType?: number,
  ProductValueList?: [
    {
      Id?:  number,
      CreatedDate?: string,
      Name?: string,
      SKU?: string,
      Price1?: number,
      Price2?:  number,
      StockNum?: number,
      ImageUrl?: string,
      IsShelfed?: boolean,
      Sort?:  number,
      DbOperateType?:  number,
    }
  ]
}
export interface ProductModel {
  Id?: number,
  CreatedDate?: string,
  BuyGroupId?: number,
  BuyGroupName?: string,
  ProductNo?:string,
  Name?: string,
  SubTitle?: string,
  BrandName?: string,
  ProductModelImageUrl?: string,
  ProductImageUrl?: string,
  ProductBannerImageUrl?: string,
  ProductBannerVideoUrl?: string,
  OpenGroupId?: number,
  Specification?: string,
  Unit?: string,
  Price1?: number,
  Price2	?: number,
  RetailPrice	?: number,
  SmallWholesalePrice?: number,
  MiddleWholesalePrice?: number,
  BigWholesalePrice?: number,
  PromotionCost?: number,
  StockNum?: number,
  Description	?: string,
  DescriptionAttri?: string,
  DescriptionInfo?: string,
  VideoUrls?: string,
  Credential?: string,
  CredentialInfo?: string,
  AfterSales?: string,
  AfterSalesInfo?: string,
  Tags?: string,
  Sort?: number,
  IsShelfed?: boolean,
  ProductAttributeList?: [ProductAttribute],
  GroupDate?: string,
  GroupEndDate?: string,
  UseStockNum?: number,
  LeaveStockNum?: number,
  SimpleName?: string,
}
export interface PageResult {
  PageIndex: number,
  PageSize: number,
  Count: number,
}
export interface PageResponse extends PageResult {
  Data: [ProductModel]
} 
export interface GetProductListResponse extends Response {
  Data: PageResponse
}
//获取商品品牌全部列表返回数据
export interface Brand {
  Sort?: number,
  Id: number,
  Name: string,
  CreatedDate: string,
  LastModified: string,
  IsSuspent: boolean,
  IsDeleted: boolean,
  DbOperateType: number
}
export interface GetProductBrandListResponse extends Response  {
  Data: [Brand]
}
//获取团购分组列表
export interface BuyGroup extends Brand {
  SimpleName: string
}
export interface BuyGroupList extends PageResult {
  Data: [BuyGroup]
}
export interface GetBuyGroupListResponse extends Response {
  Data: BuyGroupList
}
//获取商品标签列表
export interface ProductTagList extends PageResult {
  Data: [Brand]
}
export interface GetProductTagListResponse extends Response {
  Data: ProductTagList
}
//获取开团列表
export interface OpenGroup extends Brand {
  GroupDate: string,
  GroupEndDate: string
}
export interface OpenGroupList extends PageResult {
  Data: [OpenGroup]
}
export interface GetOpenGroupListResponse extends Response {
  Data: OpenGroupList
}
//新增商品信息返回数据
export interface PostList {
  CreatedDate?: string,
  LastModified?: string,
  IsShelfed?: boolean,
  IsDeleted?: boolean,
  DbOperateType?:  number,
  Id?:  number,
  Name?: string,
  ProductId?: number,
  
}
export interface ProductAttributeList extends PostList {
  AttrValues?: string
}
export interface ProductValueList extends PostList {
  SKU?: string,
  Price1?: number,
  Price2?:  number,
  StockNum?: number,
  ImageUrl?: string,
  IsShelfed?: boolean,
  Sort?:  number,
  ProductAttributeId: number,
  ProductAttributeName: string,
  UseStockNum: number,
  LeaveStockNum: number,
}
export interface PostProductResponse extends Response {
  Data: {
    CreatedDate: string,
    LastModified: string,
    IsSuspent: boolean,
    IsDeleted: boolean,
    DbOperateType: number
    Id: number,
    BuyGroupId?: number,
    BuyGroupName?: string,
    Name?: string,
    SubTitle?: string,
    ProductNo?:string,
    BrandName?: string,
    ProductModelImageUrl?: string,
    ProductImageUrl?: string,
    ProductBannerImageUrl?: string,
    ProductBannerVideoUrl?: string,
    OpenGroupId?: number,
    GroupDate?: string,
    GroupEndDate?: string,
    Specification?: string,
    Unit?: string,
    Price1?: number,
    Price2	?: number,
    RetailPrice	?: number,
    SmallWholesalePrice?: number,
    MiddleWholesalePrice?: number,
    BigWholesalePrice?: number,
    PromotionCost?: number,
    StockNum?: number,
    UseStockNum?: number,
    LeaveStockNum?: number,
    Description	?: string,
    DescriptionAttri?: string,
    DescriptionInfo?: string,
    VideoUrls?: string,
    Credential?: string,
    CredentialInfo?: string,
    AfterSales?: string,
    AfterSalesInfo?: string,
    Tags?: string,
    Sort?: number,
    IsShelfed?: boolean,
    ProductAttributeList?: [ProductAttributeList],
    ProductValueList?: [ProductValueList],
  }
}
//新增/修改团购分组信息
export interface PostBuyGroup {
  Id: number,
  CreatedDate: string,
  Name: string,
  SimpleName: string,
  Sort: number,
}
//新增/修改团购分组信息返回数据
export interface PostBuyGroupResponse extends Response {
  Data: BuyGroup
}