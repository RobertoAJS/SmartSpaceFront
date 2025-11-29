import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { DisenoService } from '../../../services/disenoservice';
import { Authservice } from '../../../services/authservice';

@Component({
  selector: 'app-disenoupload',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './disenoupload.html',
  styleUrl: './disenoupload.css',
})
export class DisenoUpload {
  selectedFile?: File;

  constructor(private dS: DisenoService, private auth: Authservice) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  subir() {
    if (!this.selectedFile) {
      alert('Selecciona un archivo.');
      return;
    }

    const userId = this.auth.getUserId(); // si no lo tienes te lo creo luego

    this.dS.upload(this.selectedFile, userId).subscribe({
      next: () => alert('Archivo subido correctamente'),
      error: (err) => {
        alert('Error al subir: ' + err.message);
        console.error(err);
      },
    });
  }
}