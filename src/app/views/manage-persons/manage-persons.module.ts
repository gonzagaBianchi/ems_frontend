import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ManagePersonsComponent } from './manage-persons.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [ManagePersonsComponent],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,

    //Table component
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,

    MatDialogModule,
    MatCardModule,
    SharedModule,
  ]
})
export class ManagePersonsModule { }
