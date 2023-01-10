import { News } from "./news.interface";

export interface Autor {
  name: string,
  imageSrc: string,
  _id?: string,
}

export interface AutorWithNews {
  name: string,
  imageSrc: string,
  _id?: string,
  news: News[]
}