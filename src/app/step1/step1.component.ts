import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectChange, MatSelectModule} from "@angular/material/select";
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
    MatFormFieldModule,
    MatSelectModule,
    NgOptimizedImage,
    FormsModule
  ],
  templateUrl: './step1.component.html',
  styleUrl: './step1.component.scss'
})
export class Step1Component implements OnInit {

  isVisible: boolean = true;

  models: TeslaModel[] = [];

  selectedModel: TeslaModel | undefined = undefined;

  selectedColor: TeslaModelColor | undefined = undefined;
  selectedColorCode: string | undefined = undefined;

  private destroyedRef: DestroyRef = inject(DestroyRef);
  private teslaInfosService: TeslaInfosService = inject(TeslaInfosService);
  private teslaConfiguratorService: TeslaConfiguratorService = inject(TeslaConfiguratorService);

  ngOnInit(): void {
    this.teslaConfiguratorService.getStepToActivated()
      .pipe(takeUntilDestroyed(this.destroyedRef))
      .subscribe(stepToActivated => {
        this.isVisible = stepToActivated == 1;
      });

    this.teslaInfosService.getModels().pipe(takeUntilDestroyed(this.destroyedRef)).subscribe(models => {
      this.models = models;
    });
  }

  chooseAModel(modelSelected: MatSelectChange): void {
    this.selectedModel = this.models.find(model => model.code == modelSelected.value);
    if (this.selectedModel) {
      this.teslaConfiguratorService.getSelectedModel().next(this.selectedModel);
      this.selectedColor = this.selectedModel.colors[0];
      this.selectedColorCode = this.selectedColor.code;
    }
  }

  chooseAColor(colorSelected: MatSelectChange): void {
    this.selectedColor = this.selectedModel?.colors.find(color => color.code == colorSelected.value);
    if (this.selectedColor) {
      this.teslaConfiguratorService.getSelectedColor().next(this.selectedColor);
    }
  }

}
