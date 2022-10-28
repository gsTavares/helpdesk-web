import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/Chamado';
import { Cliente } from 'src/app/models/Cliente';
import { Tecnico } from 'src/app/models/Tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.css']
})
export class ChamadoUpdateComponent implements OnInit {

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
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
      this.findById();
      this.findAllClientes();
      this.findAllTecnicos();
  }

  findById(): void {
    this.chamadoService.findById(this.activatedRoute.snapshot.paramMap.get('id')).subscribe({
      next: (response) => {
        this.chamado = response;
      },

      error: (ex) => {
        this.toastr.error(ex.error.error);
      }
    });
  }

  update(): void {
    this.chamadoService.update(this.activatedRoute.snapshot.paramMap.get('id'), this.chamado).subscribe({
      next: () => {
        this.toastr.success("Chamado atualizado com sucesso!", "Atualização");
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

  retornaStatus(status: any): string {
    switch (status) {
      case 0: return 'ABERTO'
      case 1: return 'EM ANDAMENTO'
      case 2: return 'ENCERRADO'
      default: return '-'
    }
  }

  retornaPrioridade(prioridade: any): string {
    switch (prioridade) {
      case 0: return 'BAIXA'
      case 1: return 'MÉDIA'
      case 2: return 'ALTA'
      default: return '-'
    }
  }

  validaCampos(): boolean {
    return (this.prioridade.valid && this.status.valid &&
      this.titulo.valid && this.observacoes.valid &&
      this.tecnico.valid && this.cliente.valid)

  }

}
