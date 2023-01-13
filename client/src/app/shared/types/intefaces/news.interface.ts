import { Autor } from "./autor.interface"
import { Category } from "./categories.intarface"

export interface News {
  title: string,
  imageSrc: string,
  list: string[],
  category: Category,
  autor: Autor,
  comments: Comment[]
  _id?: string,
}

export interface Comment {
  autor: {
    name: string,
    imageSrc: string
  },
  message: string,
  _id: string
}

export interface CreateComment {
  autor: string,
  message: string,
}