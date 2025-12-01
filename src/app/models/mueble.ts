// Esta interfaz define qué datos trae la lista de diseños dentro del mueble
export interface DisenoBasic {
  idDiseno: number;
  nombre: string;
  estado: string;
  fechaCreacion: string;
}

// --- Interfaces para la Búsqueda y Reportes ---
export interface CriterioBusqueda {   //para enviar los filtros desde el formulario de busqueda
  fechaInicio?: Date; // O string según tu manejo de fechas
  fechaFin?: Date;
  estado?: string;    // Ej: 'Activo', 'Borrador'
}

export interface ReporteDiseno {
  totalDisenos: number;
  cantidadPorEstado: { [key: string]: number }; // Ej: { "Activo": 10, "Archivado": 2 }
  listaResultados: DisenoBasic[];
}


export class Mueble {
    idMueble?: number;
    nombre: string = "";
    categoria: string = "";
    // Actualizado nuevas columnas
    estilo: string ="";
    alto: number = 0;
    ancho: number = 0;
    profundidad: number = 0; 
    precio: number = 0;
    descripcion: string = "";
    sostenibilidad: boolean = false;
    programaDev: string = "";
    idUsuario?: number; 

    disenos?: DisenoBasic[]; 
}