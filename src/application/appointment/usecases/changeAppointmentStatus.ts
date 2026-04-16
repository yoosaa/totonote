import { AppointmentStatus } from "@/src/domain/appointment/model/appointmentStatus";
import { AppointmentRepository } from "../ports/appointmentRepository";
import { Appointment } from "@/src/domain/appointment/model/appointment";
import { changeAppointmentStatusInDomain } from "@/src/domain/appointment/services/changeAppointmentStatus";

type ChangeAppointmentStatusParams = {
  repository: AppointmentRepository;
  appointmentId: string;
  nextStatus: AppointmentStatus;
  now: () => string;
};

export type ChangeAppointmentStatusResult =
  | {
      success: true;
      appointment: Appointment;
    }
  | {
      success: false;
      reason: "not_found";
    }
  | {
      success: false;
      reason: "invalid_status_transition";
    };

export const changeAppointmentStatus = async ({
  repository,
  appointmentId,
  nextStatus,
  now,
}: ChangeAppointmentStatusParams): Promise<ChangeAppointmentStatusResult> => {
  const current = await repository.getById(appointmentId);

  if (!current) {
    return {
      success: false,
      reason: "not_found",
    };
  }

  try {
    const updated = await changeAppointmentStatusInDomain({
      appointment: current,
      nextStatus,
      now: now(),
    });

    await repository.save(updated);

    return {
      success: true,
      appointment: updated,
    };
  } catch {
    return {
      success: false,
      reason: "invalid_status_transition",
    };
  }
};
