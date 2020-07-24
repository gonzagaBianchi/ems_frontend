import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, FormGroupDirective, NgForm } from '@angular/forms';
import { IFamily } from '../../../shared/models/family.model'
import { IPerson } from 'src/app/shared/models/person.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManagePersonsService } from 'src/app/shared/services/manage-persons.service';
import { ErrorStateMatcher } from '@angular/material/core';
import Swal from 'sweetalert2';
import { FamiliesService } from 'src/app/shared/services/families.service';
import { AuthService } from 'src/app/auth/auth-service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-family-modal',
  templateUrl: './family-modal.component.html',
  styleUrls: ['./family-modal.component.css']
})
export class FamilyModalComponent implements OnInit {
  isLinear = false;
  matcher = new MyErrorStateMatcher();

  public personsArray = this.fb.array([]);
  formPerson = this.fb.group({
    id: new FormControl('')
  });

  public personsData;

  form: FormGroup = this.fb.group({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    max_persons: new FormControl(Validators.required),
    persons: this.fb.array([]),
  });

  constructor(
    public dialogRef: MatDialogRef<FamilyModalComponent>,
    private managePersonsService: ManagePersonsService,
    @Inject(MAT_DIALOG_DATA) public data: IFamily,
    private changeDetectorRef: ChangeDetectorRef,
    private familiesService: FamiliesService,
    private auth: AuthService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getPersons();

    const pers = this.form.controls.persons as FormArray;

    this.data.persons.forEach((element, i) => {
      const personData = this.fb.group({
        id: element.id,
        username: element.username,
        password: element.password,
        name: element.name,
        age: element.age,
        family: element.family,
        role: element.role,
      })

      pers.push(personData);
    })

    this.form.patchValue({
      id: this.data.id ? this.data.id : null,
      name: this.data.name,
      max_persons: this.data.max_persons,
    });


    // Initializing validator.min with persons length
    this.form.controls.max_persons.setValidators([
      Validators.required,
      Validators.min(this.form.get('persons').value.length)
    ]);


    // change of person list will change the max_person validator
    this.form.controls.persons.valueChanges.subscribe(val => {
      this.form.controls.max_persons.setValidators([
        Validators.required,
        Validators.min(this.form.get('persons').value.length)
      ]);
    });

  }

  getPersons() {
    this.managePersonsService.getPersons().subscribe(
      result => {
        this.personsData = result;
        (this.personsData)
      },
      error => {
        console.error('familyModal.getPersons')
      }
    )
  }

  submitForm(event) {
    this.familiesService.createFamily(this.form.value).subscribe(
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

  addPersonToFamily() {
    if (!this.verifyMaxPersonNumber()) {
      Swal.fire('Not Allowed!', "Maximum Number Reached", 'warning');
      return;
    }

    let idPerson = this.formPerson.get('id').value;
    var person: IPerson = this.personsData.filter(event => {
      return event.id == idPerson
    });

    const pers = this.form.controls.persons as FormArray;
    const personData = this.fb.group({
      id: person[0].id,
      username: person[0].username,
    });

    pers.push(personData);
  }

  removePerson(index: number) {
    const persons = this.form.controls.persons as FormArray;
    persons.removeAt(index);

    this.changeDetectorRef.detectChanges();
  }

  validSave() {
    if (this.form.get('persons').value.length > this.form.get('max_persons').value) {
      return true;
    }
    return false;
  }

  verifyMaxPersonNumber(): boolean {
    if (this.form.get('max_persons').value === this.form.get('persons').value.length) {
      return false;
    }

    return true;
  }

  validRole() {
    let rtn = true
    if (this.form.get('id').value) {
      rtn = false;
    }

    return rtn;
  }
}
