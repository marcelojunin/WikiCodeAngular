import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    TableModule
  ]
})
export class SharedModule { }
