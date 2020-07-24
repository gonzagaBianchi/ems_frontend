
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select'
import { BrowserModule } from '@angular/platform-browser';
import { ManageFamilyComponent } from './manage-family.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FamilyModalComponent } from './family-modal/family-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [ManageFamilyComponent, FamilyModalComponent],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,

    // Angular Material modules
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatTooltipModule,
    MatButtonModule,
    CdkScrollableModule,
    MatProgressSpinnerModule,

  ]
})
export class ManageFamilyModule { }
