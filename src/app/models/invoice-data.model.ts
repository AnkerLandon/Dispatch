export interface Invoice {
  _id: string;
  accountId: string;
  date: string;
  requests: Request[];
  total: number;
  pickupFee?: number;
  route: string;
}

export interface Request {
  _id?: string;
  number: number;
  animal: animals;
  other?: string;
  complete?: boolean;
  price?: number;
  priceId?: number;
}

enum animals {
  'cow',
  'horse',
  'heffer',
  'calf',
  'bull',
  'steer',
  'pig',
  'sow',
  'boar',
  'barrel',
  'other'
}
