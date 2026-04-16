import { AppointmentDraft } from "@/src/domain/appointment/model/appointmentDraft";
import { AppointmentRepository } from "../ports/appointmentRepository";
import { Appointment } from "@/src/domain/appointment/model/appointment";
import { ValidationIssue } from "@/src/domain/appointment/validation/validationResult";
import { validateAppointmentDraft } from "@/src/domain/appointment/validation/validateAppointmentDraft";
import { createAppointmentFromDraft } from "@/src/domain/appointment/services/createAppointmentDraft";

type CreateAppointmentParams = {
  repository: AppointmentRepository;
  draft: AppointmentDraft;
  generateId: () => string;
  now: () => string;
};

export type CreateAppointmentResult =
  | {
      success: true;
      appointment: Appointment;
    }
  | {
      success: false;
      issues: ValidationIssue[];
    };

export const createAppointment = async ({
  repository,
  draft,
  generateId,
  now,
}: CreateAppointmentParams): Promise<CreateAppointmentResult> => {
  const validation = validateAppointmentDraft(draft);

  if (!validation.success) {
    return {
      success: false,
      issues: validation.issues,
    };
  }

  const appointment = createAppointmentFromDraft({
    draft,
    appointmentId: generateId(),
    now: now(),
  });

  await repository.save(appointment);

  return {
    success: true,
    appointment,
  };
};
