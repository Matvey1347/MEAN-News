import { AlertType } from "../enums/alert.enum";

export interface Alert {
  title: string,
  message: string,
  type: AlertType,
  show: boolean
}