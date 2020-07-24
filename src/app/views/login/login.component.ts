import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../shared/services/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //public variables
  public loginForm = this.fb.group({
    username: new FormControl('admin', [Validators.required,]),//Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
    password: new FormControl('qwerty123', [Validators.required]),
  });

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router,

  ) { }

  ngOnInit(): void {
  }


  login(event) {
    if (!event) {
      return;
    }

    this.loginService.loginUser(this.loginForm.value)
      .subscribe(
        res => {
          this.router.navigateByUrl('\managePersons')
        },
        error => {
          Swal.fire('Erro!', error, 'warning');
        }
      );
  }



}
