import { AppointmentDraft } from "@/src/domain/appointment/model/appointmentDraft";
import { AppointmentRepository } from "../ports/appointmentRepository";
import { Appointment } from "@/src/domain/appointment/model/appointment";
import { ValidationIssue } from "@/src/domain/appointment/validation/validationResult";
import { validateAppointmentDraft } from "@/src/domain/appointment/validation/validateAppointmentDraft";
import { updateAppointmentFromDraft } from "@/src/domain/appointment/services/updateAppointmentFromDraft";

type UpdateAppointmentParams = {
  repository: AppointmentRepository;
  appointmentId: string;
  draft: AppointmentDraft;
  now: () => string;
};

export type UpdateAppointmentResult =
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
      reason: "validation_error";
      issues: ValidationIssue[];
    };

export const updateAppointment = async ({
  repository,
  appointmentId,
  draft,
  now,
}: UpdateAppointmentParams): Promise<UpdateAppointmentResult> => {
  const current = await repository.getById(appointmentId);

  if (!current) {
    return {
      success: false,
      reason: "not_found",
    };
  }

  const validation = validateAppointmentDraft(draft);

  if (!validation.success) {
    return {
      success: false,
      reason: "validation_error",
      issues: validation.issues,
    };
  }

  const appointment = await updateAppointmentFromDraft({
    current,
    draft,
    now: now(),
  });

  await repository.save(appointment);

  return {
    success: true,
    appointment,
  };
};
