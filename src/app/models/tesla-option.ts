import {TeslaOptionConfig} from "./tesla-option-config";

export class TeslaOption {

  configs: TeslaOptionConfig[];
  towHitch: boolean;
  yoke: boolean;

  constructor(configs: TeslaOptionConfig[], towHitch: boolean, yoke: boolean) {
    this.configs = configs;
    this.towHitch = towHitch;
    this.yoke = yoke;
  }
}
