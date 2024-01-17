import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {TeslaInfosService} from "../services/tesla-infos.service";
import {TeslaModel} from "../models/tesla-model";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {TeslaModelColor} from "../models/tesla-model-color";
import {NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {TeslaConfiguratorService} from "../services/tesla-configurator.service";

@Component({
  selector: 'app-step1',
  standalone: true,
  imports: [
    NgOptimizedImage,
    FormsModule
  ],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss'
})
export class Step1Component implements OnInit {

  models: TeslaModel[] = [];

  selectedModel: TeslaModel | undefined = undefined;
  selectedColor: TeslaModelColor | undefined = undefined;
  selectedColorCode: string | undefined = undefined;

  private destroyedRef: DestroyRef = inject(DestroyRef);
  private teslaInfosService: TeslaInfosService = inject(TeslaInfosService);
  private teslaConfiguratorService: TeslaConfiguratorService = inject(TeslaConfiguratorService);

  ngOnInit(): void {
    this.teslaInfosService.getModels().pipe(takeUntilDestroyed(this.destroyedRef)).subscribe(models => {
      this.models = models;
    });
  }

  chooseAModel(modelSelected: string): void {
    if (!this.selectedModel || this.selectedModel.code != modelSelected) {
      this.selectedModel = this.models.find(model => model.code == modelSelected);
      if (this.selectedModel) {
        this.teslaConfiguratorService.setSelectedModel(this.selectedModel);

        this.selectedColor = this.selectedModel.colors[0];
        this.selectedColorCode = this.selectedColor.code;
      }
    }
  }

  chooseAColor(colorSelected: string): void {
    this.selectedColor = this.selectedModel?.colors.find(color => color.code == colorSelected);
    if (this.selectedColor) {
      this.teslaConfiguratorService.setSelectedColor(this.selectedColor);
      this.teslaConfiguratorService.getStepToActivated().next(2);
    }
  }

}
