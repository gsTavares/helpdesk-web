import { Component, OnInit } from '@angular/core';

// Router -> responsável por executar a navegação do projeto
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {

  constructor(private router: Router) { }

  // Executa no ato da renderização do component
  ngOnInit(): void {
    this.router.navigate(['tecnicos']);
  }

}
