import { Component, OnInit } from '@angular/core';

// Router -> responsável por executar a navegação do projeto
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private toast: ToastrService
  ) { }

  // Executa no ato da renderização do component
  ngOnInit(): void {
    this.router.navigate(['chamados/read/1']);
  }

  logout(): void {
    this.router.navigate(['login']);
    this.authService.logout();
    this.toast.info('Logout realizado com sucesso!', 'Logout', {timeOut: 7000});
  }

}
