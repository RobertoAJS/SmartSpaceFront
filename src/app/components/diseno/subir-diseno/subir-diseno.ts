import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { Disenoservice } from '../../../services/disenoservice';
import { Authservice } from '../../../services/authservice';

@Component({
  selector: 'app-subir-diseno',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './subir-diseno.component.html',
  styleUrls: ['./subir-diseno.component.css']
})
export class SubirDisenoComponent implements OnInit {
  
  nombreDiseno: string = '';
  idMueble: number = 0;
  idUsuario: number = 0;
  archivoSeleccionado: File | null = null;
  mensaje: string = '';
  cargando: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private disenoService: Disenoservice,
    private authService: Authservice
  ) {}

  ngOnInit(): void {
    // 1. Obtener el ID del Mueble de la URL
    this.route.params.subscribe(params => {
      this.idMueble = +params['id']; // El '+' convierte string a número
    });

    // 2. Obtener el ID del Usuario logueado
    this.idUsuario = this.authService.getUserId();
    
    if (this.idUsuario <= 0) {
      this.mensaje = 'Error: No estás logueado correctamente.';
    }
  }

  onFileSelected(event: any) {
    this.archivoSeleccionado = event.target.files[0];
  }

  subir() {
    if (!this.archivoSeleccionado) {
      this.mensaje = 'Debes seleccionar un archivo .glb o .gltf';
      return;
    }

    this.cargando = true;
    this.mensaje = 'Subiendo archivo a la nube...';

    // Empaquetamos todo en FormData
    const formData = new FormData();
    formData.append('file', this.archivoSeleccionado);
    formData.append('nombre', this.nombreDiseno);
    formData.append('idMueble', this.idMueble.toString());
    formData.append('idUsuario', this.idUsuario.toString());

    this.disenoService.subirDiseno(formData).subscribe({
      next: (resp) => {
        this.cargando = false;
        this.mensaje = '¡Diseño subido con éxito!';
        // Redirigir a la vista del diseño o volver a la lista
        // this.router.navigate(['/muebles']); 
        // O ir a ver el modelo 3D recién creado:
        // window.location.href = resp.url; 
      },
      error: (err) => {
        this.cargando = false;
        console.error(err);
        this.mensaje = 'Error al subir. Intenta de nuevo.';
      }
    });
  }
}