import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LazyFeatureComponent } from 'app/lazy-feature/lazy-feature.component';

const routes: Routes = [
    { path: '', component: LazyFeatureComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LazyFeatureRoutingModule { }
