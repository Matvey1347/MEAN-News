import { Role } from "../enums/role.enum"

export interface User {
  _id: string,
  name: string,
  role: Role,
  imageSrc: string,
  subscriptions: string[]
}

export interface RegisterPost {
  email: string,
  name: string,
  password: string,
  role: string,
}

export interface LoginPost {
  name: string,
  password: string
}