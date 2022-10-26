import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  cliente: Cliente = {} as Cliente;

  nome: FormControl = new FormControl(null, Validators.minLength(3))
  cpf: FormControl = new FormControl(null, Validators.required)
  email: FormControl = new FormControl(null, Validators.email)
  senha: FormControl = new FormControl(null, Validators.minLength(3))

  constructor(
    private clienteService: ClienteService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cliente.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.clienteService.findById(this.cliente.id).subscribe({
      next: (response) => {
        response.perfis = [];
        this.cliente = response;
      }
    });
  }

  update(): void {
    this.clienteService.update(this.cliente).subscribe({
      next: () => {
        this.toastr.success('Cliente atualizado com sucesso!', 'Atualização');
        this.router.navigate(['clientes']);
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
    this.cliente.perfis.includes(perfil) ? this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1)
      : this.cliente.perfis.push(perfil);
  }

  validaCampos(): boolean {
    return (this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid)
  }

}
