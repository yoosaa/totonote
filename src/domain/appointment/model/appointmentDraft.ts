import { AppointmentStatus } from "./appointmentStatus";
import { PreparationItem } from "./preparationItem";
import { VisitNote } from "./visitNote";

export type AppointmentDraft = {
  customerName: string;
  serviceName: string;
  scheduledAt: string;
  note: string;
  status: AppointmentStatus;
  preparationItems: PreparationItem[];
  visitNote: VisitNote;
};
