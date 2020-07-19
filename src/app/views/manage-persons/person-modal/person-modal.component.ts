import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-person-modal',
  templateUrl: './person-modal.component.html',
  styleUrls: ['./person-modal.component.css']
})
export class PersonModalComponent implements OnInit {

  form: FormGroup = this.fb.group({
    id: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    name: new FormControl(''),
    age: new FormControl(''),
    family: new FormControl(''),
    role: new FormControl(''),
  })

  constructor(
    private fb: FormBuilder,
    private changeDetect: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

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

    this.changeDetect.detectChanges();
  }

  submitForm() {
    console.log(this.form.value)
  }



}
