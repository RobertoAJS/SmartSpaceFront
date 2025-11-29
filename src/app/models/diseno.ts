export class Diseno {
  idDiseno?: number;
  nombre: string = '';
  fechaCreacion?: string | Date;
  estado: string = '';
  archivoUrl: string = '';

  userId?: number;
  username?: string;

  usuario?: {
    idUsuario: number;
    username: string;
  };
}
