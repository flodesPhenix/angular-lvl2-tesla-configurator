import {Component, OnInit} from '@angular/core';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {FormsModule} from "@angular/forms";

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

  ngOnInit(): void {
    this.steps = ['Step 1', 'Step 2', 'Step 3'];
  }

  onSelectedStep(): void {
    if (this.stepSelected) {
      console.log("Step selected %d", this.stepSelected);
    }
  }

}
