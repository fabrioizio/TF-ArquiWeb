import { Component } from '@angular/core';
import {TraduccionService} from '../../services/traduccion.service';
import {UsuarioService} from '../../services/usuario.service';
import {Traduccion} from '../../model/Traduccion';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-translate-premium',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './translate-premium.component.html',
  styleUrl: './translate-premium.component.css'
})
export class TranslatePremiumComponent {
  textoOriginal: string = "Hola"; // Texto por defecto
  idiomaOriginal: string = 'es'; // Idioma original por defecto
  idiomaTraducir: string = 'ay';// Idioma a traducir por defecto
  textoTraducido: string = ''; // Texto traducido

  constructor(
    private router: Router,
    private traduccionService: TraduccionService,
    private usuarioService: UsuarioService // Inyecta el servicio de usuario
  ) {}
  navegacion():void{
    const rolLogueado = this.usuarioService.getRolId(); // Obtiene el ID del usuario logueado
    const rolId = rolLogueado? parseInt(rolLogueado, 10) : 0;

    switch (rolId) {
      case 1:
        console.log(rolId);
        break;
      case 2:
        this.router.navigate(['/main-user-free']);
        break;
      case 3:
        this.router.navigate(['/main-user']);
        break;
      case 4:
        this.router.navigate(['/main-user-premium']);
        break;
      default:
        console.log("Error switch");
        break;
    }
  };
  traducir() {
    const usuarioLogueado = this.usuarioService.getUserId(); // Obtiene el ID del usuario logueado
    const  usuarioId = usuarioLogueado? parseInt(usuarioLogueado, 10) : null;
    if (usuarioId) {
      const traduccion: Traduccion = {
        id: 0, // Se asume que el ID será autogenerado
        textoOriginal: this.textoOriginal,
        textoTraducido: '',
        fechaTraduccion: new Date(),
        idiomaOriginal: this.idiomaOriginal,
        idiomaTraducir: this.idiomaTraducir,
        usuariosUsuarioid: { id: usuarioId} // Incluye el ID del usuario logueado
      };

      console.log('ID del usuario autenticado para traducción:', usuarioLogueado);
      console.log("envia:", traduccion)

      this.traduccionService.traducirTexto(traduccion).subscribe({
        next: (response) => {
          this.textoTraducido = response.textoTraducido;
          console.log('Traducción exitosa:', response);
        },
        error: (err) => {
          console.error('No se encontró el ID del usuario, por lo que no se puede realizar la traducción.');
        }
      });


    } else {
      console.error('No se encontró el ID del usuario, por lo que no se puede realizar la traducción.');
    }
  }

  updateFromLanguage(event: any) {
    this.idiomaOriginal = event.target.value; // Actualiza el idioma original
  }

  updateToLanguage(event: any) {
    this.idiomaTraducir = event.target.value; // Actualiza el idioma a traducir
  }
}
