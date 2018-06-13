export class Customer {
  position: number;
  name: string;
  weight?: number;
  symbol?: string;

  names: string[] =  ['edit', 'position', 'name', 'weight', 'symbol'];

  constructor(position: number, name: string, weight?: number, symbol?: string) {
      this.position = position;
      this.name = name;
      this.weight = weight;
      this.symbol = symbol;
  }
}
