import { Appointment } from "../model/appointment";
import { AppointmentDraft } from "../model/appointmentDraft";

type CreateAppointmentFromDraftParams = {
  draft: AppointmentDraft;
  appointmentId: string;
  now: string;
};

export const createAppointmentFromDraft = ({
  draft,
  appointmentId,
  now,
}: CreateAppointmentFromDraftParams): Appointment => {
  return {
    id: appointmentId,
    customerName: draft.customerName.trim(),
    serviceName: draft.serviceName.trim(),
    scheduledAt: draft.scheduledAt,
    note: draft.note.trim(),
    status: draft.status,
    preparationItems: draft.preparationItems.map((item) => ({
      id: item.id,
      label: item.label.trim(),
      checked: item.checked,
    })),
    visitNote: {
      body: draft.visitNote.body.trim(),
    },
    createdAt: now,
    updatedAt: now,
  };
};
