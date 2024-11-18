import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {UsuarioService} from '../../services/usuario.service';

@Component({
  selector: 'app-main-user-free',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './main-user-free.component.html',
  styleUrl: './main-user-free.component.css'
})
export class MainUserFreeComponent {
  constructor(private usuarioService: UsuarioService, private router: Router) {}
  //console.log("usuario: "+this.usuarioService.getUserId());console.log("rol: " +this.usuarioService.getRolId()); }

  onLogout(): void {
    this.usuarioService.logout();
    this.router.navigate(['/']);
  }
}
