import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {UsuarioService} from '../../services/usuario.service';

@Component({
  selector: 'app-main-admin',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './main-admin.component.html',
  styleUrl: './main-admin.component.css'
})
export class MainAdminComponent {

}
