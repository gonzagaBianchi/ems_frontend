import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../shared/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //public variables
  public loginForm = this.fb.group({
    username: new FormControl('', [Validators.required,]),//Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,

  ) { }

  ngOnInit(): void {
  }


  login(event) {
    if (!event) {
      return;
    }
    console.log("teste")

    this.loginService.loginUser(this.loginForm.value)
      .subscribe(
        res => {
          console.log("res");
          // const alerta: AlertaComponent = new AlertaComponent(this.snackBar);
          // alerta.exibir(`O tipo '${tipoChecklist.get('nome').value}' foi adicionado`);

          // this.salvando = false;
          // this.activeModal.close(this.criarTipoFormGroup);
        },
        error => {
          // this.salvando = false;
          Swal.fire('Erro!', error, 'warning');
        }
      );
  }



}
