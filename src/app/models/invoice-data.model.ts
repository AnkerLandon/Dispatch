export interface Invoice {
  _id: string;
  accountId: string;
  date: string;
  requests: Request[];
  total: number;
}

export interface Request {
  _id?: string;
  number: number;
  animal: animals;
  other?: string;
  complete?: boolean;
  price?: number;
}

enum animals {
  'cow',
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
