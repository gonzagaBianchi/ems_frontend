import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ManagePersonsService } from 'src/app/shared/services/manage-persons.service';
import { FamiliesService } from 'src/app/shared/services/families.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { IPerson } from 'src/app/shared/models/person.model';
import { AuthService } from 'src/app/auth/auth-service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-person-modal',
  templateUrl: './person-modal.component.html',
  styleUrls: ['./person-modal.component.css']
})
export class PersonModalComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  public itemsBefore: FormGroup;

  form: FormGroup = this.fb.group({
    id: new FormControl(''),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    name: new FormControl(''),
    age: new FormControl('', Validators.required),
    family: new FormControl('', Validators.required),
    role: new FormControl(''),
  })

  familyData: Array<object>;
  roleData: Array<object> = [
    { name: 'Admin', value: 'admin' },
    { name: 'Normal', value: 'normal' },
  ];

  constructor(
    public dialogRef: MatDialogRef<PersonModalComponent>,
    private managePersonsService: ManagePersonsService,
    @Inject(MAT_DIALOG_DATA) public data: IPerson,
    private familiesService: FamiliesService,
    private changeDetect: ChangeDetectorRef,
    private auth: AuthService,
    private fb: FormBuilder,

  ) {
  }

  ngOnInit(): void {
    this.form.patchValue({
      id: this.data.id ? this.data.id : null,
      username: this.data.username,
      password: this.data.password,
      name: this.data.name,
      age: this.data.age,
      family: this.data.family,
      role: this.data.role,
    });

    this.getFamily();

    this.itemsBefore = this.form.value;
    this.verifyAvailability();

    this.changeDetect.detectChanges();
  }

  submitForm(event) {
    if (!this.validFormBefore() && this.form.get('id')) {
      Swal.fire('Error!', "Não foi possível encontrar alterações", 'warning');
      return;
    }

    if (this.form.get("id").value) {
      const param = { id: this.form.get("id").value, family: { family: this.form.get('family').value } };

      this.managePersonsService.editPerson(param).subscribe(
        result => {
          this.dialogRef.close();
          Swal.fire(
            'Edited!',
            'Value Edited.',
            'success'
          );
        },
        error => {
          Swal.fire('Error!', error, 'warning');
        }
      )
    }

    if (!this.form.get('id').value) {
      !this.form.get('role').value ? this.form.patchValue({ role: 'normal' }) : '';
      this.managePersonsService.createPerson(this.form.value).subscribe(
        result => {
          this.dialogRef.close(this.form.get('id').value);
          Swal.fire(
            'Created!',
            'Value Created.',
            'success'
          );

        },
        error => {
          Swal.fire('Error!', error, 'warning');
        }
      )
    }
  }

  validFormBefore() {
    if (this.itemsBefore === this.form.value) {
      return false;
    }

    return true;
  }

  verifyAvailability() {
    if (this.form.get('id').value) {
      this.form.controls['username'].disable();
      this.form.controls['password'].disable();
      this.form.controls['name'].disable();
      this.form.controls['age'].disable();
      this.form.controls['role'].disable();
    }
  }

  getFamily() {
    this.familiesService.getFamilies().subscribe(
      result => {
        this.familyData = [];

        result.forEach(element => {
          let x = { id: element.id, name: element.name };
          this.familyData.push(x);
        });
      },
      error => {
        Swal.fire('Error!', error, 'warning');
      }
    )
  }
}
