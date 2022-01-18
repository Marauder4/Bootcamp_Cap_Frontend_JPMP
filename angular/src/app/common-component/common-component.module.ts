import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormButtonsComponent } from './form-buttons/form-buttons.component';



@NgModule({
  declarations: [
    FormButtonsComponent,
  ],
  exports: [
    FormButtonsComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class CommonComponentModule { }
