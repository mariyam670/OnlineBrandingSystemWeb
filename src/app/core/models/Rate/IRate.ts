import { IBrand } from '../brand/Ibrand';

export interface IRate{
    rateId: number,
    ratingValue: number,
    brandId: number,
    userId: number,
    brand: IBrand
    user:user
}

export interface user{
    userId: number
    fullName: string
}