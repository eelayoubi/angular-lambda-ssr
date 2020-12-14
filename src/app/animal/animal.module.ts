import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnimalRoutingModule } from './animal-routing.module';
import { AnimalComponent } from './animal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AnimalRoutingModule
  ],
  declarations: [AnimalComponent]
})
export class AnimalModule { }