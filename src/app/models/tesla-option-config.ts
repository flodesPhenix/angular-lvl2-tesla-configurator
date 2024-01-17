export class TeslaOptionConfig {

  id: number;
  description: string;
  range: number;
  speed: number;
  price: number;

  constructor(id: number, description: string, range: number, speed: number, price: number) {
    this.id = id;
    this.description = description;
    this.range = range;
    this.speed = speed;
    this.price = price;
  }
}
