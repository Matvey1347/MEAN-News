import { News } from "./news.interface"

export interface CategoryName {
  name: string,
  _id: string
}

export interface Category {
  _id: string,
  name: string,
  imageSrc: string,
  subscribe: boolean,
  news: News[]
}