import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/Chamado';
import { ChamadoService } from 'src/app/services/chamado.service';

@Component({
  selector: 'app-chamado-read',
  templateUrl: './chamado-read.component.html',
  styleUrls: ['./chamado-read.component.css']
})
export class ChamadoReadComponent implements OnInit {

  chamado: Chamado = {} as Chamado

  constructor(
    private chamadoService: ChamadoService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
      this.findById();
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

}
