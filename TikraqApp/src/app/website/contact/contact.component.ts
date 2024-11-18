import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatError, MatFormField, MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {CommonModule, NgIf} from '@angular/common';
import {UsuarioService} from '../../services/usuario.service';
import {Usuario} from '../../model/Usuario';
import {ConsultaService} from '../../services/consulta.service';
import {Consulta} from '../../model/Consulta';

@Component({
  selector: 'app-contact',
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
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit{
  ContactanosForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private consultaService: ConsultaService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.ContactanosForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  onSubmit(): void {

    const usuarioLogueado = this.usuarioService.getUserId();
    const usuarioId = usuarioLogueado ? parseInt(usuarioLogueado, 10) : 0;
    const consulta: Consulta = {
      id: 0,
      titulo: this.ContactanosForm.get('titulo')?.value || '',
      descripcion: this.ContactanosForm.get('descripcion')?.value || '',
      usuariosUsuarioid: { id: usuarioId}
    };

    const rolLogueado = this.usuarioService.getRolId();
    const rolId = rolLogueado? parseInt(rolLogueado, 10) : 0;

    this.consultaService.createConsulta(consulta).subscribe({
      next: (response) => {
        console.log('Consulta registrada exitosamente:', response);
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
      },
      error: (err) => {
        console.error('Error al registrar consulta:', err);
      }
    });


  }

}
