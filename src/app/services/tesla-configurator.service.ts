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

  private selectedModelSubject: Subject<TeslaModel> = new Subject<TeslaModel>();
  private selectedColorSubject: Subject<TeslaModelColor> = new Subject<TeslaModelColor>();

  private stepToActivated: Subject<number> = new Subject<number>();

  public getStepToActivated(): Subject<number> {
    return this.stepToActivated;
  }

  public getSelectedModel(): TeslaModel | undefined {
    return this.selectedModel;
  }

  public setSelectedModel(selectedModel: TeslaModel): void {
    this.selectedModel = selectedModel;
    this.selectedOption = undefined;
    this.selectedColor = undefined;
    this.towHitch = undefined;
    this.yoke = undefined;
    this.selectedModelSubject.next(selectedModel);
  }

  public getSelectedColor(): TeslaModelColor | undefined {
    return this.selectedColor;
  }

  public setSelectedColor(selectedColor: TeslaModelColor): void {
    this.selectedColor = selectedColor;
    this.selectedColorSubject.next(selectedColor);
  }

  public getSelectedModelSubject(): Subject<TeslaModel> {
    return this.selectedModelSubject;
  }

  public getSelectedColorSubject(): Subject<TeslaModelColor> {
    return this.selectedColorSubject;
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
