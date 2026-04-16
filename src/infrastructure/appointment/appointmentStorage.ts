import { Appointment } from "@/src/domain/appointment/model/appointment";

const STORAGE_KEY = "totonote:appointments";

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === "object" && value !== null;
};

const isPreparationItem = (
  value: unknown
): value is Appointment["preparationItems"][number] => {
  if (!isRecord(value)) return false;

  return (
    typeof value.id === "string" &&
    typeof value.label === "string" &&
    typeof value.checked === "boolean"
  );
};

const isVisitNote = (value: unknown): value is Appointment["visitNote"] => {
  if (!isRecord(value)) return false;

  return typeof value.body === "string";
};

const isAppointmentStatus = (
  value: unknown
): value is Appointment["status"] => {
  return value === "accepted" || value === "preparing" || value === "completed";
};

const isAppointment = (value: unknown): value is Appointment => {
  if (!isRecord(value)) return false;

  return (
    typeof value.id === "string" &&
    typeof value.customerName === "string" &&
    typeof value.serviceName === "string" &&
    typeof value.scheduledAt === "string" &&
    typeof value.note === "string" &&
    isAppointmentStatus(value.status) &&
    Array.isArray(value.preparationItems) &&
    value.preparationItems.every(isPreparationItem) &&
    isVisitNote(value.visitNote) &&
    typeof value.createdAt === "string" &&
    typeof value.updatedAt === "string"
  );
};

const isAppointmentArray = (value: unknown): value is Appointment[] => {
  return Array.isArray(value) && value.every(isAppointment);
};

export const loadAppointmentsFromStorage = (): Appointment[] => {
  if (typeof window === "undefined") return [];

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) return [];

  try {
    const parsed: unknown = JSON.parse(raw);

    if (!isAppointmentArray(parsed)) return [];

    return parsed;
  } catch {
    return [];
  }
};

export const saveAppointmentsToStorage = (
  appointments: Appointment[]
): void => {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
};

export const removeAppointmentsFromStorage = (): void => {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(STORAGE_KEY);
};
