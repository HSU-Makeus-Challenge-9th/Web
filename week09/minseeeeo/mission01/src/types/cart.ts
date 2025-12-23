export interface LP {
  id: string;
  title: string;
  singer: string;
  price: string;
  img: string;
  amount: number;
}

export interface CartItems {
  lp: LP[];
}
