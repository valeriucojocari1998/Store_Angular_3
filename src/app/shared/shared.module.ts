import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { sharedPipes } from './pipes';
import { sharedComponents } from './components';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [sharedPipes, sharedComponents],
  exports: [sharedPipes, sharedComponents],
})
export class SharedModule {}
