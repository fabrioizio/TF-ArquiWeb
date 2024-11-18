import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import {UsuarioService} from '../../services/usuario.service';
import {Usuario} from '../../model/Usuario';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {RoleService} from '../../services/role.service';
import {SuscripcionService} from '../../services/suscripcion.service';


@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [
    RouterLink,
    MatCardContent,
    MatCardTitle,
    MatCard,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.css'
})
export class EditarPerfilComponent implements OnInit {
  editarPerfilForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private suscripcionService: SuscripcionService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.editarPerfilForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }
  nav():void{
    const rolLogueado = this.usuarioService.getRolId();
    const rolId = rolLogueado? parseInt(rolLogueado, 10) : 0;

    switch (rolId) {
      case 1:
        console.log(rolId);
        break;
      case 2:
        this.router.navigate(['/translate-free']);
        break;
      case 3:
        this.router.navigate(['/translate']);
        break;
      case 4:
        this.router.navigate(['/translate-premium']);
        break;
      default:
        console.log("Error switch");
        break;
    }
  };
  private redirigirPorRol(rolId: number): void {
    switch (rolId) {
      case 1:
        console.log('Rol de administrador.');
        break;
      case 2:
        this.router.navigate(['/login']);
        break;
      case 3:
        this.router.navigate(['/login']);
        break;
      case 4:
        this.router.navigate(['/login']);
        break;
      default:
        console.error('Rol desconocido.');
        break;
    }
  }

  onSubmit(): void {
    if (this.editarPerfilForm.valid) {
      const password = this.editarPerfilForm.get('password')?.value;
      const confirmPassword = this.editarPerfilForm.get('confirmPassword')?.value;

      if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
      }

      const usuarioLogueado = this.usuarioService.getUserId();
      const usuarioId = usuarioLogueado ? parseInt(usuarioLogueado, 10) : 0;
      const rolLogueado = this.usuarioService.getRolId();
      const rolId = rolLogueado ? parseInt(rolLogueado, 10) : 0;
      const rolNombre = this.usuarioService.getNombreRol() || '';

      const usuario: Usuario = {
        id: usuarioId,
        nombre: this.editarPerfilForm.get('nombre')?.value || '',
        correoElectronico: this.editarPerfilForm.get('email')?.value || '',
        contrasenia: password,
        idiomaPreferido: 'español',
        roles: [{ id: rolId, nombre: rolNombre }],
        consultas: [],
        calificaciones: [],
        cursos: [],
        suscripciones: [],
        traducciones: []
      };

      this.usuarioService.actualizarUsuario(usuario).subscribe({
        next: (response) => {
          console.log(response);
          alert('Perfil actualizado correctamente.');
          this.redirigirPorRol(rolId);
        },
        error: (err) => {
          console.error('Error al actualizar usuario:', err);
          alert('Error al actualizar el perfil. Intenta de nuevo.');
        }
      });
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }

  cancelarSuscripcion(): void {
    const suscripcionId = parseInt(this.suscripcionService.getSuscripcionId() || '0', 10);
    const usuarioId = parseInt(this.usuarioService.getUserId() || '0', 10);
    const rolId = 2; // ID del rol 'FREE'

    this.suscripcionService.cancelarSuscripcion(suscripcionId).subscribe({
      next: () => {
        console.log('Suscripción cancelada exitosamente.');

        this.roleService.actualizarRol(usuarioId, rolId).subscribe({
          next: () => {
            console.log('Rol actualizado a FREE.');
            localStorage.setItem('rolId', rolId.toString());
            this.redirigirPorRol(rolId);
          },
          error: (err) => {
            console.error('Error al actualizar rol:', err);
            alert('No se pudo actualizar el rol. Intenta de nuevo.');
          }
        });
      },
      error: (err) => {
        console.error('Error al cancelar la suscripción:', err);
        alert('No se pudo cancelar la suscripción. Intenta de nuevo.');
      }
    });
  }

  eliminarCuenta(): void {
    const usuarioLogueado = this.usuarioService.getUserId();
    const usuarioId = usuarioLogueado ? parseInt(usuarioLogueado, 10) : 0;

    this.usuarioService.eliminarCuenta(usuarioId).subscribe({
      next: () => {
        alert('Cuenta eliminada correctamente.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al eliminar cuenta:', err);
        alert('No se pudo eliminar la cuenta. Intenta de nuevo.');
      }
    });
  }



}
