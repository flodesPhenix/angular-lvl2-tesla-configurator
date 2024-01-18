import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {TeslaModel} from "../models/tesla-model";
import {TeslaModelColor} from "../models/tesla-model-color";
import {TeslaConfiguratorService} from "../services/tesla-configurator.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-selected-tesla-model-img',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './selected-tesla-model-img.component.html',
  styleUrl: './selected-tesla-model-img.component.scss'
})
export class SelectedTeslaModelImgComponent implements OnInit {

  selectedModel: TeslaModel | undefined = undefined;
  selectedColor: TeslaModelColor | undefined = undefined;

  private destroyedRef: DestroyRef = inject(DestroyRef);
  private teslaConfiguratorService: TeslaConfiguratorService = inject(TeslaConfiguratorService);

  ngOnInit(): void {
    this.teslaConfiguratorService.getSelectedModelSubject()
      .pipe(takeUntilDestroyed(this.destroyedRef))
      .subscribe(model => this.selectedModel = model);

    this.teslaConfiguratorService.getSelectedColorSubject()
      .pipe(takeUntilDestroyed(this.destroyedRef))
      .subscribe(color => this.selectedColor = color);
  }

}
