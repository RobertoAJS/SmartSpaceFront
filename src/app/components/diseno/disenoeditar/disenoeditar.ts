import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DisenoService } from '../../../services/disenoservice';
import { Diseno } from '../../../models/diseno';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-disenoeditar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './disenoeditar.html',
  styleUrl: './disenoeditar.css'
})
export class DisenoEditar implements OnInit {
  
  form!: FormGroup;
  id!: number;
  diseno: Diseno = new Diseno();
  edicion: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dS: DisenoService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      estado: ['', Validators.required],
      archivoUrl: [{ value: '', disabled: true }]
    });

    this.route.params.subscribe((p: Params) => {
      this.id = p['id'];
      this.edicion = this.id != null;
      this.init();
    });
  }

  init(): void {
    if (this.edicion) {
      this.dS.listId(this.id).subscribe((data) => {
        this.diseno = data;

        this.form.patchValue({
          nombre: data.nombre,
          estado: data.estado,
          archivoUrl: data.archivoUrl
        });
      });
    }
  }

  guardar(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.diseno.idDiseno = this.id;
    this.diseno.nombre = this.form.value.nombre;
    this.diseno.estado = this.form.value.estado;

    this.dS.update(this.diseno).subscribe({
      next: () => {
        alert('Diseño actualizado correctamente');
        this.dS.list().subscribe((lista) => this.dS.setList(lista));
        this.router.navigate(['/disenos']);
      },
      error: (err) => {
        console.error(err);
        alert('Error al actualizar diseño');
      }
    });
  }
}