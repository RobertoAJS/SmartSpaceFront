import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import '@google/model-viewer'; 
import { Diseno } from '../../models/diseno';
// 1. IMPORTAR EL SERVICIO (Asegúrate de que la ruta sea correcta)
import { Disenoservice } from '../../services/disenoservice'; 

@Component({
  selector: 'app-diseno-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './diseno-view.html',
  styleUrls: ['./diseno-view.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class DisenoViewComponent implements OnInit {
  
  // Inicializamos vacío para evitar errores de "null" en el HTML
  diseno: Diseno = new Diseno(); 
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    // 2. CORREGIDO: Completar el tipo de dato
    private disenoService: Disenoservice 
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.cargarDiseno(id);
      }
    });
  }

  cargarDiseno(id: number) {
    this.disenoService.listId(id).subscribe({
      next: (data) => {
        this.diseno = data;
        this.loading = false;
      },
      error: (err) => {
        console.error("Error al cargar el diseño:", err);
        this.loading = false;
      }
    });
  }
}