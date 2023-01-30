export interface ItemModel {
   _id?: string,
   name: string,
   price: number,
   inStock: boolean,
   manufacturer: string,
   supplier: string,
   companyId: string,
   quantity?: number
}