import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnimalComponent } from './animal.component';


const routes: Routes = [
  {
    path: ':id',
    component: AnimalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimalRoutingModule { }