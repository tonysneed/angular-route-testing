import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyFeatureRoutingModule } from './lazy-feature-routing.module';
import { LazyFeatureComponent } from './lazy-feature.component';

@NgModule({
  imports: [
    CommonModule,
    LazyFeatureRoutingModule
  ],
  declarations: [LazyFeatureComponent]
})
export class LazyFeatureModule { }
