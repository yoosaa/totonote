import { Appointment } from "../model/appointment";
import { AppointmentStatus } from "../model/appointmentStatus";

const ALLOWED_STATUS_TRANSITIONS: Record<
  AppointmentStatus,
  AppointmentStatus[]
> = {
  accepted: ["preparing"],
  preparing: ["completed"],
  completed: [],
};

export const canTransitionAppointmentStatus = (
  current: AppointmentStatus,
  next: AppointmentStatus
): boolean => {
  return ALLOWED_STATUS_TRANSITIONS[current].includes(next);
};

type ChangeAppointmentStatusParams = {
  appointment: Appointment;
  nextStatus: AppointmentStatus;
  now: string;
};

export const changeAppointmentStatusInDomain = ({
  appointment,
  nextStatus,
  now,
}: ChangeAppointmentStatusParams): Appointment => {
  if (!canTransitionAppointmentStatus(appointment.status, nextStatus)) {
    throw new Error(
      `Invalid appointments status transition: ${appointment.status} -> ${nextStatus}`
    );
  }

  return {
    ...appointment,
    status: nextStatus,
    updatedAt: now,
  };
};
