import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Mueble } from '../../../models/mueble';
import { Muebleservice } from '../../../services/muebleservice';

@Component({
  selector: 'app-mueblesearch',
  standalone: true,
  imports: [
    MatTableModule,
    ReactiveFormsModule,
    CommonModule,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './mueblesearch.html',
  styleUrl: './mueblesearch.css',
})
export class Mueblesearch {
  dataSource: MatTableDataSource<Mueble> = new MatTableDataSource();
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'];
  categoria: string = '';
  mensaje: string = '';
  form: FormGroup;

  constructor(private mS: Muebleservice, private fb: FormBuilder) {
    this.form = this.fb.group({
      categoria: [''],
    });
  }

  ngOnInit(): void {
    this.mS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.form.get('categoria')?.valueChanges.subscribe((value) => {
      this.categoria = value;
      this.buscar();
    });
  }

  buscar(): void {
    const termino = this.categoria.trim();

    if (termino === '') {
      this.mS.list().subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.mensaje = '';
      });
      return;
    }

    this.mS.searchName(termino).subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.mensaje = data.length === 0 ? 'No se encontraron muebles.' : '';
    });
  }
}
