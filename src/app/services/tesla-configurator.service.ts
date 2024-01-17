import {Injectable} from '@angular/core';
import {TeslaModel} from "../models/tesla-model";
import {Subject} from "rxjs";
import {TeslaModelColor} from "../models/tesla-model-color";

@Injectable({
  providedIn: 'root'
})
export class TeslaConfiguratorService {

  private stepToActivated: Subject<number> = new Subject<number>();
  private selectedModel: Subject<TeslaModel> = new Subject<TeslaModel>();
  private selectedColor: Subject<TeslaModelColor> = new Subject<TeslaModelColor>();

  public getStepToActivated(): Subject<number> {
    return this.stepToActivated;
  }

  public getSelectedModel(): Subject<TeslaModel> {
    return this.selectedModel;
  }

  public getSelectedColor(): Subject<TeslaModelColor> {
    return this.selectedColor;
  }
}
