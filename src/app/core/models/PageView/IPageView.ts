
import { IBrand } from "../brand/Ibrand"
import { ISite } from "../site/ISite"

export interface IPageView {
    pageViewId: 0,
    viewsCount: 0,
    brandId: 0,
    userId: 0,
    brand: IBrand
    site: ISite
    user: user
}

export interface user { 
    userId: number
    fullName: string
}