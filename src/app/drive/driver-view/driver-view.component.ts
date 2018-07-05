import { Component } from '@angular/core';

@Component({
  selector: 'app-driver-view-',
  templateUrl: './driver-view.component.html',
  styleUrls: ['../drive.component.css']
})
export class DriverViewComponent {
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
