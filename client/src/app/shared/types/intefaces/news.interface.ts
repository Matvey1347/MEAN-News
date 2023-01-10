import { Autor } from "./autor.interface"
import { Category } from "./categories.intarface"

export interface News {
  title: string,
  imageSrc: string,
  list: string[],
  _id: string,
  category: Category,
  autor: Autor,
  comments: Comment[]
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