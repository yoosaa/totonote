import { Appointment } from "../model/appointment";
import { AppointmentDraft } from "../model/appointmentDraft";

type UpdateAppointmentFromDraftParams = {
  current: Appointment;
  draft: AppointmentDraft;
  now: string;
};

export const updateAppointmentFromDraft = ({
  current,
  draft,
  now,
}: UpdateAppointmentFromDraftParams): Appointment => {
  return {
    ...current,
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
    updatedAt: now,
  };
};
