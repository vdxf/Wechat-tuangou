export interface GoodsItem {
  CreatedDate: string
  LastModified: string
  IsSuspent: boolean
  IsDeleted: boolean
  DbOperateType: number
  Id: number
  BuyGroupId: number
  Name: string
  ProductNum: string
  ProductModelImageUrl: string
  ProductImageUrl: string
  GroupDate: string
  GroupEndDate: string
  Specification: string
  Unit: string
  Price1: number
  Price2: number
  RetailPrice: number
  SmallWholesalePrice: number
  MiddleWholesalePrice: number
  BigWholesalePrice: number
  PromotionCost: number
  StockNum: number
  Description: string
  VideoUrls: string
  AfterSales: string
  Tags: string
  Sort: number
  IsShelfed: boolean
}

export interface TagItem {
  Id: number
  Name: string
  CreatedDate: string
  Sort: number
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
