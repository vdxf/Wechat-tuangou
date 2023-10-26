export interface Response {
  Status: number,
  Message: string,
  Id: string,
  Extend: string,
}

//获取商品列表数据类型
export interface GetProductList {
  PageIndex: number,
  PageSize: number,
  Keywords?: string,
  StartDate?: string,
  EndDate?: string,
  DateSort?: number,
  NameSort?: number,
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
      IsShelfed?: true,
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
export interface PageResponse {
  PageIndex: number,
  PageSize: number,
  Count: number,
  Data: [ProductModel]
} 
export interface GetProductListResponse extends Response {
  Data: PageResponse
}
//获取商品品牌全部列表返回数据
export interface Brand {
  Sort: number,
  Id: number,
  Name: string,
  CreatedDate: string,
  LastModified: string,
  IsSuspent: boolean,
  IsDeleted: boolean,
  DbOperateType: number
}
export interface GetProductBrandAllLisResponse extends Response  {
  Data: [Brand]
}
//新增商品信息返回数据
export interface PostProduct {

}