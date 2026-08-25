import { auditApi } from "@/services/api";
import type { AuditEvent, AuditEventRequest } from "@/interfaces/audit/AuditEvent";

export async function registerAuditEvent(request: AuditEventRequest): Promise<AuditEvent> {
	const { data } = await auditApi.post<AuditEvent>("/auditoria/eventos", request);
	return data;
}

export async function listAuditEvents(service: string, from?: string): Promise<AuditEvent[]> {
	const { data } = await auditApi.get<AuditEvent[]>("/auditoria/eventos", {
		params: { servicio: service, ...(from ? { desde: from } : {}) }
	});
	return data;
}

export async function listAuditEventsByType(type: string): Promise<AuditEvent[]> {
	const { data } = await auditApi.get<AuditEvent[]>(`/auditoria/eventos/tipo/${type}`);
	return data;
}
