import {TeslaModelColor} from "./tesla-model-color";

export class TeslaModel {

  code: string;
  description: string;
  colors: TeslaModelColor[];

  constructor(code: string, description: string, colors: TeslaModelColor[]) {
    this.code = code;
    this.description = description;
    this.colors = colors;
  }
}
