import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/Tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  tecnico: Tecnico = {} as Tecnico;

  nome: FormControl = new FormControl(null, Validators.minLength(3))
  cpf: FormControl = new FormControl(null, Validators.required)
  email: FormControl = new FormControl(null, Validators.email)
  senha: FormControl = new FormControl(null, Validators.minLength(3))

  constructor(
    private tecnicoService: TecnicoService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tecnico.perfis = []
  }

  create(): void {
    this.tecnicoService.create(this.tecnico).subscribe({
      next: () => {
        this.toastr.success('Técnico cadastrado com sucesso!', 'Cadastro');
        this.router.navigate(['tecnicos']);
      },
      error: (ex) => {
        if(ex.error.errors) {
          ex.error.errors.forEach((element: { message: string | undefined; }) => {
              this.toastr.error(element.message);
          });
        } else {
          this.toastr.error(ex.error.message);
        }
      }
    });
  }

  addPerfil(perfil: any): void {
    this.tecnico.perfis.includes(perfil) ? this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1)
      : this.tecnico.perfis.push(perfil);
  }

  validaCampos(): boolean {
    return (this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid)
  }

}
