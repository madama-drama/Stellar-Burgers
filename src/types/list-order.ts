export enum WebsocketStatus {
    // eslint-disable-next-line no-unused-vars
    ONLINE = 'ONLINE',
    // eslint-disable-next-line no-unused-vars
    OFFLINE = 'OFFLINE'
  }

export interface OrdersConfig{
  success: boolean,
  orders: Array<IOrder>,
  total: number,
  totalToday: number
}

export interface IOrder{
  ingredients: Array<string>,
  _id: string,
  status: string,
  number: number,
  name: string
  createdAt: string,
  updatedAt: string
}

