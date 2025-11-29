import { Mueble } from "./mueble";
import { Usuario } from "./usuario";

export class Favorito {
  idFavorito?: number;
  usuario?: Usuario;
  mueble?: Mueble;
  fechaAgregado?: string;
}
