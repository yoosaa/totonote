import { AppointmentRepository } from "../ports/appointmentRepository";

type DeleteAppointmentParams = {
  repository: AppointmentRepository;
  appointmentId: string;
};

export type DeleteAppointmentResult =
  | {
      success: true;
    }
  | {
      success: false;
      reason: "not_found";
    };

export const deleteAppointment = async ({
  repository,
  appointmentId,
}: DeleteAppointmentParams): Promise<DeleteAppointmentResult> => {
  const current = await repository.getById(appointmentId);

  if (!current) {
    return {
      success: false,
      reason: "not_found",
    };
  }

  await repository.delete(appointmentId);

  return {
    success: true,
  };
};
