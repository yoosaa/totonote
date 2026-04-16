import { Appointment } from "@/src/domain/appointment/model/appointment";

export type AppointmentRepository = {
  list(): Promise<Appointment[]>;
  getById(id: string): Promise<Appointment | null>;
  save(appointment: Appointment): Promise<void>;
  delete(id: string): Promise<void>;
};
