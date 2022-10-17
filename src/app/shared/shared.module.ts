import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedMaterialModule } from 'src/app/shared/shared-material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { sharedPipes } from './pipes';
import { sharedComponents } from './components';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    SharedMaterialModule,
    RouterModule,
  ],
  declarations: [sharedPipes, sharedComponents],
  exports: [
    sharedPipes,
    sharedComponents,
    SharedMaterialModule,
    FlexLayoutModule,
  ],
})
export class SharedModule {}
