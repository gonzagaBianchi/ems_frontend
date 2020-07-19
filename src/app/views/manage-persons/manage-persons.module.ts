import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ManagePersonsComponent } from './manage-persons.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialogContent } from '@angular/material/dialog';
import { PersonModalComponent } from './person-modal/person-modal.component';

@NgModule({
  declarations: [ManagePersonsComponent, PersonModalComponent],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,

    //Table component
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,

    MatDialogModule,
  ],
})
export class ManagePersonsModule { }
