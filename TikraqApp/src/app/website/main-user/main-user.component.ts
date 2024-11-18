import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {UsuarioService} from '../../services/usuario.service';

@Component({
  selector: 'app-main-user',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './main-user.component.html',
  styleUrl: './main-user.component.css'
})
export class MainUserComponent {

  constructor(private usuarioService: UsuarioService, private router: Router) {}
  //console.log("usuario: "+this.usuarioService.getUserId());console.log("rol: " +this.usuarioService.getRolId());

  onLogout(): void {
    this.usuarioService.logout();
    this.router.navigate(['/']);
  }
}
