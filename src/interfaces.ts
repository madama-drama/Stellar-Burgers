export interface IIngredient {
  /** Айди, который пришел с бэка */
  _id: string;

  /** Айди, который создали мы */
  id: string;

  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export interface IBackIngredient extends Omit<IIngredient, 'id'> {}


export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IUser {
  name: string;
  email: string;
}
