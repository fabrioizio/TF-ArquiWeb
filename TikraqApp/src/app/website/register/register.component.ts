import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';  // Importa CommonModule
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {UsuarioService} from '../../services/usuario.service';
import {Usuario} from '../../model/Usuario';
import {Role} from '../../model/Role';
import {RoleService} from '../../services/role.service';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group(
      {
        nombre: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      },
      { validators: this.checkPasswords }
    );
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      const usuario: Usuario = new Usuario(
        0,
        this.registroForm.get('nombre')?.value || '',
        this.registroForm.get('email')?.value || '',
        this.registroForm.get('password')?.value || '',
        'español',
        []
      );

      // Paso 1: Registrar al usuario
      this.usuarioService.registrarUsuario(usuario).subscribe({
        next: (response) => {
          const userId = response.id;
          console.log('ID de usuario registrado:', userId); // Confirmar que userId no sea 0 ni undefined

          // Verificar si la respuesta contiene roles
          const rolId = response.roles?.length > 0 ? response.roles[0].id : 2; // Asignar rol predeterminado (Free)
          console.log(rolId)


          if (userId && userId !== 0) {
            this.roleService.registrarRolPorUsuarioId(userId, rolId).subscribe({
              next: (roleResponse) => {
                localStorage.setItem('rolId', roleResponse.id.toString());
                console.log('Rol registrado exitosamente:', roleResponse);
                this.router.navigate(['/login']);
              },
              error: (roleError: any) => {
                console.error('Error al registrar rol:', roleError);
              }
            });
          } else {
            console.error('ID de usuario inválido:', userId);
          }
        },
        error: (err) => {
          console.error('Error al registrar usuario:', err);
        }
      });
    }
  }

  checkPasswords(group: FormGroup): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    const email = group.get('email')?.value;
    const confirmEmail = group.get('confirmEmail')?.value;

    return password === confirmPassword && email === confirmEmail ? null : { notSame: true };
  }

}
