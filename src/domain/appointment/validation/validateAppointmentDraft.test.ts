import { describe, expect, it } from "vitest";
import { validateAppointmentDraft } from "./validateAppointmentDraft";
import type { AppointmentDraft } from "../model/appointmentDraft";

const createValidDraft = (): AppointmentDraft => ({
  customerName: "山田 花子",
  serviceName: "カウンセリング",
  scheduledAt: "2026-04-16T10:00:00.000Z",
  note: "初回相談",
  status: "accepted",
  preparationItems: [
    {
      id: "prep-1",
      label: "ヒアリングシート準備",
      checked: false,
    },
  ],
  visitNote: {
    body: "",
  },
});

describe("validateAppointmentDraft", () => {
  it("妥当な draft のとき success=true を返す", () => {
    const draft = createValidDraft();

    const result = validateAppointmentDraft(draft);

    expect(result.success).toBe(true);
    expect(result.issues).toHaveLength(0);
  });

  it("顧客名・サービス名・予約日時が空のときエラーを返す", () => {
    const draft: AppointmentDraft = {
      ...createValidDraft(),
      customerName: "",
      serviceName: "",
      scheduledAt: "",
    };

    const result = validateAppointmentDraft(draft);

    expect(result.success).toBe(false);
    expect(result.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: "customerName" }),
        expect.objectContaining({ field: "serviceName" }),
        expect.objectContaining({ field: "scheduledAt" }),
      ])
    );
  });
});
