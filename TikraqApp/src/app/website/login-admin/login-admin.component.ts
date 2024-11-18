import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {NgIf} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UsuarioService} from '../../services/usuario.service';
import {RequestDto} from '../../model/request-dto';
import {ResponseDto} from '../../model/response-dto';
import {LoginService} from '../../services/login.service';
import {RoleService} from '../../services/role.service';

@Component({
  selector: 'app-login-admin',
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
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent implements OnInit{
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private loginService: LoginService
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      localStorage.removeItem('token');
      console.log('Token eliminado');
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const requestDto: RequestDto = {
        correoElectronico: this.loginForm.value.email,
        contrasenia: this.loginForm.value.password,
      };

      this.loginService.login(requestDto).subscribe({
        next: (data: ResponseDto): void => {
          //console.log('Respuesta de login:', data);

          if (data.roles && data.roles.length > 0) {
            const userRole = data.roles[0];
            localStorage.setItem('rol', userRole);
            localStorage.setItem('token', data.jwt);

            //console.log('Rol y token guardados correctamente',userRole,data.jwt);

            // Redirige según el rol
            if (userRole === 'ADMIN') {
              this.router.navigate(['/main-admin']);
            } else {
              this.router.navigate(['/login']);
            }
          } else {
            console.warn('No se encontraron roles en la respuesta.');
            alert('No tienes permisos!');
          }
        },
        error: (error) => {
          console.error('Error al iniciar sesión:', error);
          alert('Credenciales inválidas. Intenta de nuevo.');
        },
      });
    } else {
      alert('Formulario no válido!');
      console.log('Formulario no válido');
    }
  }
}
