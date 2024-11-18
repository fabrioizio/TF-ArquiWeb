  import {Component, numberAttribute, OnInit} from '@angular/core';
  import {Router, RouterLink} from '@angular/router';
  import {MatButton} from '@angular/material/button';
  import {MatCard, MatCardContent} from '@angular/material/card';
  import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
  import {MatInput} from '@angular/material/input';
  import {NgIf} from '@angular/common';
  import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
  import {UsuarioService} from '../../services/usuario.service';
  import {Usuario} from '../../model/Usuario';
  import {RoleService} from '../../services/role.service';
  import {RequestDto} from '../../model/request-dto';
  import {ResponseDto} from '../../model/response-dto';
  import {LoginService} from '../../services/login.service';

  @Component({
    selector: 'app-login',
    standalone: true,
    imports: [
      RouterLink,
      MatButton,
      MatCard,
      MatCardContent,
      MatError,
      MatFormField,
      MatInput,
      MatLabel,
      NgIf,
      ReactiveFormsModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
  })
  export class LoginComponent implements OnInit{
    loginForm: FormGroup;

    constructor(
      private fb: FormBuilder,
      private router: Router,
      private usuarioService: UsuarioService,
      private roleService: RoleService,
      private loginService: LoginService
    ) {
      this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
      });
    }

    ngOnInit(): void {
      const token = localStorage.getItem('token');
      if (token) {
        localStorage.removeItem('token');
        console.log('Token eliminado.');
      }
    }



  onSubmit(): void {
      if (this.loginForm.valid) {
        const requestDto: RequestDto = {
          correoElectronico: this.loginForm.value.email,
          contrasenia: this.loginForm.value.password,
        };

        this.loginService.login(requestDto).subscribe({
          next: (data: ResponseDto): void => {
            const correoElectronico = this.loginForm.value.email;
            const contrasenia = this.loginForm.value.password;


            this.usuarioService.iniciarSesion(correoElectronico, contrasenia).subscribe({
              next: (userResponse) => {
                const usuarioId = userResponse.id;
                const nombreUsuario = userResponse.nombre || '';

                if (usuarioId) {
                  localStorage.setItem('usuarioId', usuarioId.toString());
                  localStorage.setItem('nombreUsuario', nombreUsuario);

                  this.roleService.obtenerUltimoRolPorUsuarioId(usuarioId).subscribe({
                    next: (roleResponse) => {
                      const rolId = roleResponse?.id;
                      const nombreRol = roleResponse?.nombre || '';

                      if (rolId) {
                        localStorage.setItem('rolId', rolId.toString());
                        localStorage.setItem('nombreRol', nombreRol);
                        localStorage.setItem('token', data.jwt);

                        this.redirigirPorRol(rolId);
                      } else {
                        console.error('El ID del rol no se encontró.');
                        alert('Error al obtener el rol del usuario.');
                      }
                    },
                    error: (roleError) => {
                      console.error('Error al obtener el rol:', roleError);
                      alert('No se pudo obtener el rol del usuario.');
                    }
                  });
                } else {
                  console.error('No se pudo obtener el ID del usuario.');
                  alert('Error al iniciar sesión.');
                }
              },
              error: (userError) => {
                console.error('Error al iniciar sesión:', userError);
                alert('Credenciales incorrectas. Intente de nuevo.');
              }
            });
          },
          error: (authError) => {
            console.error('Error en la autenticación:', authError);
            alert('Error en la autenticación. Por favor, intente de nuevo.');
          }
        });
      } else {
        console.warn('Formulario no válido.');
        alert('Por favor, complete todos los campos correctamente.');
      }
    }

    private redirigirPorRol(rolId: number): void {
      switch (rolId) {
        case 1:
          this.router.navigate(['/main-admin']);
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
          console.error('Rol desconocido:', rolId);
          alert('Rol desconocido. Contacte con soporte.');
      }
    }
  }
