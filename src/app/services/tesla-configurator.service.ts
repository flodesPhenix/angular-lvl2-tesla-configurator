import {Injectable} from '@angular/core';
import {TeslaModel} from "../models/tesla-model";
import {Subject} from "rxjs";
import {TeslaModelColor} from "../models/tesla-model-color";
import {TeslaOptionConfig} from "../models/tesla-option-config";

@Injectable({
  providedIn: 'root'
})
export class TeslaConfiguratorService {

  private selectedModel: TeslaModel | undefined = undefined;
  private selectedColor: TeslaModelColor | undefined = undefined;
  private selectedOption: TeslaOptionConfig | undefined = undefined;
  private towHitch: boolean | undefined;
  private yoke: boolean | undefined;

  private stepToActivated: Subject<number> = new Subject<number>();

  public getStepToActivated(): Subject<number> {
    return this.stepToActivated;
  }

  public getSelectedModel(): TeslaModel | undefined {
    return this.selectedModel;
  }

  public setSelectedModel(selectedModel: TeslaModel): void {
    this.selectedModel = selectedModel;
  }

  public getSelectedColor(): TeslaModelColor | undefined {
    return this.selectedColor;
  }

  public setSelectedColor(selectedColor: TeslaModelColor): void {
    this.selectedColor = selectedColor;
  }

  public getSelectedOption(): TeslaOptionConfig | undefined {
    return this.selectedOption;
  }

  public setSelectedOption(selectedOption: TeslaOptionConfig): void {
    this.selectedOption = selectedOption;
  }

  public getTowHitch(): boolean | undefined {
    return this.towHitch;
  }

  public setTowHitch(value: boolean | undefined): void {
    this.towHitch = value;
  }

  public getYoke(): boolean | undefined {
    return this.yoke;
  }

  public setYoke(value: boolean | undefined): void {
    this.yoke = value;
  }
}
