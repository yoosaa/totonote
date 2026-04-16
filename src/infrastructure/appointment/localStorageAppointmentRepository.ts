import { AppointmentRepository } from "@/src/application/appointment/ports/appointmentRepository";
import { Appointment } from "@/src/domain/appointment/model/appointment";
import {
  loadAppointmentsFromStorage,
  saveAppointmentsToStorage,
} from "./appointmentStorage";

const sortByCreatedAtAsc = (a: Appointment, b: Appointment): number => {
  return a.createdAt.localeCompare(b.createdAt);
};

export const localStorageAppointmentRepository: AppointmentRepository = {
  async list(): Promise<Appointment[]> {
    const appointments = loadAppointmentsFromStorage();

    return [...appointments].sort(sortByCreatedAtAsc);
  },

  async getById(id: string): Promise<Appointment | null> {
    const appointments = loadAppointmentsFromStorage();

    return appointments.find((appointment) => appointment.id === id) ?? null;
  },

  async save(appointment: Appointment): Promise<void> {
    const appointments = loadAppointmentsFromStorage();
    const index = appointments.findIndex((item) => item.id === appointment.id);

    if (index === -1) {
      saveAppointmentsToStorage([...appointments, appointment]);
      return;
    }

    const nextAppointments = [...appointments];
    nextAppointments[index] = appointment;

    saveAppointmentsToStorage(nextAppointments);
  },

  async delete(id: string): Promise<void> {
    const appointments = loadAppointmentsFromStorage();
    const nextAppointments = appointments.filter(
      (appointment) => appointment.id !== id
    );

    saveAppointmentsToStorage(nextAppointments);
  },
};
