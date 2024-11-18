import {Component, numberAttribute} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {Suscripcion} from '../../model/Suscripcion';
import {UsuarioService} from '../../services/usuario.service';
import {SuscripcionService} from '../../services/suscripcion.service';
import {Usuario} from '../../model/Usuario';
import {Role} from '../../model/Role';
import {RoleService} from '../../services/role.service';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css'
})
export class SubscriptionComponent {
  constructor(
    private router: Router,
    private suscripcionService: SuscripcionService,
    private usuarioService: UsuarioService,
    private roleService: RoleService
  ) {}

  activarSuscripcion(tipo: string): void {
    const usuarioLogueado = this.usuarioService.getUserId();
    const usuarioId = usuarioLogueado ? parseInt(usuarioLogueado, 10) : 0;

    // Definir roles
    const roles = {
      FREE: 2,
      SUSCRIPTOR: 3,
      PREMIUM: 4
    };

    let rolId = 0;
    let rutaDestino = '';

    switch (tipo.toUpperCase()) {
      case 'FREE':
        rolId = roles.FREE;
        rutaDestino = '/main-user-free';
        console.log("Activando usuario gratuito");
        break;
      case 'SUSCRIPTOR':
        rolId = roles.SUSCRIPTOR;
        rutaDestino = '/main-user';
        console.log("Activando usuario suscriptor estándar");
        break;
      case 'PREMIUM':
        rolId = roles.PREMIUM;
        rutaDestino = '/main-user-premium';
        console.log("Activando usuario suscriptor premium");
        break;
      default:
        console.error("Tipo de suscripción no reconocido:", tipo);
        return;
    }

    const suscripcion: Suscripcion = {
      id: 0,
      tipo: tipo.toUpperCase(),
      fechaInicio: new Date(),
      fechaFin: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      estado: 'ACTIVA',
      usuariosUsuarioid: { id: usuarioId }
    };

    this.suscripcionService.activarSuscripcion(suscripcion).subscribe({
      next: (response) => {
        console.log('Suscripción activada exitosamente', response);

        // Guardar información local
        localStorage.setItem('rolId', rolId.toString());
        localStorage.setItem('suscripcionId', response.id.toString());

        // Actualizar rol del usuario
        this.roleService.actualizarRol(usuarioId, rolId).subscribe({
          next: (roleResponse) => {
            console.log('Rol actualizado exitosamente', roleResponse);
            this.router.navigate([rutaDestino]); // Redirigir según el rol
          },
          error: (roleError) => {
            console.error('Error al actualizar rol:', roleError);
          }
        });
      },
      error: (error) => {
        console.error('Error al activar la suscripción:', error);
        alert('No se pudo activar la suscripción. Intente de nuevo.');
      }
    });
  }
}

