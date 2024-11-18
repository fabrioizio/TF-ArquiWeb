import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LenguaService} from '../../services/lengua.service';
import {Lengua} from '../../model/Lengua';

@Component({
  selector: 'app-register-language',
  standalone: true,
  imports: [
    RouterLink,
    MatCardContent,
    MatCard,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './register-language.component.html',
  styleUrls: ['./register-language.component.css']
})
export class RegisterLanguageComponent implements OnInit{
  registroLenguaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private lenguaService: LenguaService
  ) {}

  ngOnInit(): void {
    this.registroLenguaForm = this.fb.group({
      nombreLengua: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registroLenguaForm.valid) {
      const nuevaLengua: Lengua = {
        id: 0,
        nombreLengua: this.registroLenguaForm.get('nombreLengua')?.value || '',
        cursos: [] // Atributo por defecto
      };

      this.lenguaService.agregarLengua(nuevaLengua).subscribe({
        next: (response) => {
          console.log('Lengua registrada exitosamente:', response);
          this.router.navigate(['/language']);
        },
        error: (err) => {
          console.error('Error al registrar lengua:', err);
        }
      });
    }
  }
}
