import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatCardModule, MatButtonModule],
  exports: [MatCardModule, MatButtonModule],
})
export class SharedMaterialModule {}
