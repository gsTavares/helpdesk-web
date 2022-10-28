import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/Chamado';
import { Cliente } from 'src/app/models/Cliente';
import { Tecnico } from 'src/app/models/Tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit {

  chamado: Chamado = {} as Chamado

  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];

  prioridade: FormControl = new FormControl(null, [Validators.required]);
  status: FormControl = new FormControl(null, [Validators.required]);
  titulo: FormControl = new FormControl(null, [Validators.required]);
  observacoes: FormControl = new FormControl(null, [Validators.required]);
  tecnico: FormControl = new FormControl(null, [Validators.required]);
  cliente: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private chamadoService: ChamadoService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
      this.findAllClientes();
      this.findAllTecnicos();
  }

  create(): void {
    this.chamadoService.create(this.chamado).subscribe({
      next: (response) => {
        this.toastr.success("Chamado criado com sucesso!", "Novo chamado");
        this.router.navigate(["chamados"]);
      },

      error: (ex) => {
        this.toastr.error(ex.error.error);
      }
    });
  }

  findAllClientes(): void {
    this.clienteService.findAll().subscribe({
      next: (response) => {
        this.clientes = response;
      }
    })
  }

  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe({
      next: (response) => {
        this.tecnicos = response;
      }
    })
  }

  validaCampos(): boolean {
    return (this.prioridade.valid && this.status.valid &&
      this.titulo.valid && this.observacoes.valid &&
      this.tecnico.valid && this.cliente.valid)

  }

}
