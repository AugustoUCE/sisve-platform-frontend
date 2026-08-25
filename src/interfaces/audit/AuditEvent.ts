export interface AuditEvent {
  idAuditoria: number;
  tipoEvento: string;
  descripcion?: string;
  fechaEvento: string;
  ipOrigen?: string;
  servicioOrigen: string;
}

export interface AuditEventRequest {
  tipoEvento: string;
  descripcion?: string;
  ipOrigen?: string;
  servicioOrigen: string;
}
