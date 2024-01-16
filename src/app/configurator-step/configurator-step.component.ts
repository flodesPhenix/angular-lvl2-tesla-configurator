import {Component, inject, OnInit} from '@angular/core';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-configurator-step',
  standalone: true,
  imports: [
    MatButtonToggleModule,
    FormsModule
  ],
  templateUrl: './configurator-step.component.html',
  styleUrl: './configurator-step.component.scss'
})
export class ConfiguratorStepComponent implements OnInit {

  steps: string[] = [];

  stepSelected?: number;

  private router: Router = inject(Router);

  ngOnInit(): void {
    this.steps = ['Step 1', 'Step 2', 'Step 3'];
  }

  onSelectedStep(): void {
    if (this.stepSelected) {
      const selectedStep: number = +this.stepSelected + 1;
      this.router.navigate(['step' + selectedStep]);
    }
  }

}
