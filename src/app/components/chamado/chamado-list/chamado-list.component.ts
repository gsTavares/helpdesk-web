import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Chamado } from 'src/app/models/Chamado';
import { ChamadoService } from 'src/app/services/chamado.service';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent implements OnInit {

  ELEMENT_DATA: Chamado[] = [];
  FILTERED_DATA: Chamado[] = [];

  displayedColumns = ['id', 'titulo', 'cliente', 'tecnico', 'dataAbertura', 'prioridade', 'status', 'actions'];
  dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private chamadoService: ChamadoService
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.chamadoService.findAll().subscribe({
      next: (response) => {
        this.ELEMENT_DATA = response;
        this.dataSource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  filterByStatus(status: any) {
    const listChamado = [...this.ELEMENT_DATA];
    this.FILTERED_DATA = listChamado.filter(element => element.status == status);
    this.dataSource = new MatTableDataSource<Chamado>(this.FILTERED_DATA);
    this.dataSource.paginator = this.paginator;
  }

}
