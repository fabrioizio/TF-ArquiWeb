import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {UsuarioService} from '../../services/usuario.service';

@Component({
  selector: 'app-main-user-premium',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './main-user-premium.component.html',
  styleUrl: './main-user-premium.component.css'
})
export class MainUserPremiumComponent {
  constructor(private usuarioService: UsuarioService, private router: Router) {}
  //console.log("usuario: "+this.usuarioService.getUserId());console.log("rol: " +this.usuarioService.getRolId()); }

  onLogout(): void {
    this.usuarioService.logout();
    this.router.navigate(['/']);
  }

}
