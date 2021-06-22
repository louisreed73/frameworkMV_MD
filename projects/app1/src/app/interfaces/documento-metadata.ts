
/**
 *
 * DocumentoMetadata
 * API Buscador
 * Documento Rendering
 * info Documento
 */
export interface DocumentoMetadata {

  
  /**
   *
   * result
   * http info
   *
   */  
  result: {
    status: boolean;
    info: string;
    errors: {
      code: number;
      message: string;
    }[];
    http_code: number;
    trace_id: string;
    stack_trace: {
      declaring_class: string;
      method_name: string;
      file_name: string;
      line_number: number;
    }[];
    updated_elements: number;
  };

    /**
   *
   * data
   * API Buscador Documento
   * data for rendering
   *
   */  
  data: {
    pdf: null | string;
    Descripcion: string;
    tipo_documental: string;
    tramite: string;
    modelo: string;
    estado_cumplimentacion: string;
    fecha_cumplimentacion: string;
    procedimiento: string;
    organo: string;
    delito_materia: string;
    situacion: string;
    fase_procesal: string;
    organo_origen: string;
    procedimiento_origen: string;
    tipo_resolucion: string;
    numero_resolucion: string;
    fecha_resolucion: string;
    estado_resolucion: string;
    ["fallo/acuerdo"]: string;
    tipo_escrito: string;
    numero_año_escrito: string;
    fecha_presentacion: string;
    estado_escrito: string;
  };
}
