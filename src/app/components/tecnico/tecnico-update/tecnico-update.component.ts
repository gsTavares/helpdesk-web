import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/Tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {

  tecnico: Tecnico = {} as Tecnico;

  nome: FormControl = new FormControl(null, Validators.minLength(3))
  cpf: FormControl = new FormControl(null, Validators.required)
  email: FormControl = new FormControl(null, Validators.email)
  senha: FormControl = new FormControl(null, Validators.minLength(3))

  constructor(
    private tecnicoService: TecnicoService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.tecnico.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.tecnicoService.findById(this.tecnico.id).subscribe({
      next: (response) => {
        response.perfis = [];
        this.tecnico = response;
      }
    });
  }

  update(): void {
    this.tecnicoService.update(this.tecnico).subscribe({
      next: () => {
        this.toastr.success('Técnico atualizado com sucesso!', 'Atualização');
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
