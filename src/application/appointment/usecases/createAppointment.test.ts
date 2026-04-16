import { describe, expect, it, vi } from "vitest";
import { createAppointment } from "./createAppointment";
import type { AppointmentDraft } from "@/src/domain/appointment/model/appointmentDraft";
import type { AppointmentRepository } from "../ports/appointmentRepository";

const createValidDraft = (): AppointmentDraft => ({
  customerName: "山田 花子",
  serviceName: "カウンセリング",
  scheduledAt: "2026-04-16T10:00:00.000Z",
  note: "初回相談",
  status: "accepted",
  preparationItems: [],
  visitNote: {
    body: "",
  },
});

const createRepositoryMock = (): AppointmentRepository => ({
  list: vi.fn(),
  getById: vi.fn(),
  save: vi.fn(),
  delete: vi.fn(),
});

describe("createAppointment", () => {
  it("妥当な draft のとき appointment を保存して success=true を返す", async () => {
    const repository = createRepositoryMock();
    const draft = createValidDraft();

    const result = await createAppointment({
      repository,
      draft,
      generateId: () => "appointment-1",
      now: () => "2026-04-16T00:00:00.000Z",
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.appointment.id).toBe("appointment-1");
      expect(result.appointment.createdAt).toBe("2026-04-16T00:00:00.000Z");
    }

    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(repository.save).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "appointment-1",
        customerName: "山田 花子",
        serviceName: "カウンセリング",
      })
    );
  });

  it("不正な draft のとき保存せず success=false を返す", async () => {
    const repository = createRepositoryMock();
    const invalidDraft: AppointmentDraft = {
      ...createValidDraft(),
      customerName: "",
    };

    const result = await createAppointment({
      repository,
      draft: invalidDraft,
      generateId: () => "appointment-1",
      now: () => "2026-04-16T00:00:00.000Z",
    });

    expect(result.success).toBe(false);
    expect(repository.save).not.toHaveBeenCalled();
  });
});
