import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Tecnico } from 'src/app/models/Tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css']
})
export class TecnicoListComponent implements OnInit {

  ELEMENT_DATA: Tecnico[] = []

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: TecnicoService) { }

  ngOnInit(): void {
    this.findAll();
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

  findAll() {
    this.service.findAll().subscribe({
      next: (response) => {
        this.ELEMENT_DATA = response;
        this.dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
