import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Credenciais } from 'src/app/models/Credenciais';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  creds: Credenciais = {} as Credenciais

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  constructor(
    private toast: ToastrService,
    private service: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logar() {

    // Sintaxe depreciada '-'
    // this.service.authenticate(this.creds).subscribe(response => {
    //   const token: string = response.headers.get('Authorization')!.substring(7);
    //   this.service.successfullLogin(token);
    //   this.router.navigate(['home']);
    // }, () => {
    //   this.toast.error('Usuário e/ou senha inválidos', 'Erro');
    // })

    this.service.authenticate(this.creds).subscribe({
        next: (response) => {
          const token: string = response.headers.get('Authorization')!.substring(7);
          this.service.successfullLogin(token);
          this.router.navigate(['home']);
        },
        error: () => {
          this.toast.error('Usuário e/ou senha inválidos', 'Erro');
        }
    })
  }

  validaCampos(): boolean {
    return (this.email.valid && this.senha.valid)
  }

}
