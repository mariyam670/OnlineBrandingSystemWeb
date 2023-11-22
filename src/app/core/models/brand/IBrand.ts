import { ISite } from "../site/ISite";

export interface IBrand {
      brandId: number,
      brandName: string,
      brandEmail: string,
      brandContact: number,
      brandQuote: string,
      brandKeyword: string,
      brandInterests: string,
      brandDescription: string,
      brandImage: string,
      changeOn: Date,
      changeBy: number,
      createdOn: Date,
      createdBy: number,
      deletedOn: Date,
      siteId: number,
      site:ISite
}