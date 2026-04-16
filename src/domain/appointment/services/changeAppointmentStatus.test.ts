import { describe, expect, it } from "vitest";
import { changeAppointmentStatusInDomain } from "./changeAppointmentStatus";
import type { Appointment } from "../model/appointment";

const createAppointment = (status: Appointment["status"]): Appointment => ({
  id: "appointment-1",
  customerName: "山田 花子",
  serviceName: "カウンセリング",
  scheduledAt: "2026-04-16T10:00:00.000Z",
  note: "",
  status,
  preparationItems: [],
  visitNote: {
    body: "",
  },
  createdAt: "2026-04-10T09:00:00.000Z",
  updatedAt: "2026-04-10T09:00:00.000Z",
});

describe("changeAppointmentStatus", () => {
  it("accepted から preparing へ変更できる", () => {
    const appointment = createAppointment("accepted");

    const result = changeAppointmentStatusInDomain({
      appointment,
      nextStatus: "preparing",
      now: "2026-04-16T00:00:00.000Z",
    });

    expect(result.status).toBe("preparing");
    expect(result.updatedAt).toBe("2026-04-16T00:00:00.000Z");
  });

  it("accepted から completed へは直接変更できない", () => {
    const appointment = createAppointment("accepted");

    expect(() =>
      changeAppointmentStatusInDomain({
        appointment,
        nextStatus: "completed",
        now: "2026-04-16T00:00:00.000Z",
      })
    ).toThrowError();
  });
});
