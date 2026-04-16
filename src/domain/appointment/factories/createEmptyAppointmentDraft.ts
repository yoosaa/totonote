import { AppointmentDraft } from "../model/appointmentDraft";

export const createEmptyAppointmentDraft = (): AppointmentDraft => {
  return {
    customerName: "",
    serviceName: "",
    scheduledAt: "",
    note: "",
    status: "accepted",
    preparationItems: [],
    visitNote: {
      body: "",
    },
  };
};
