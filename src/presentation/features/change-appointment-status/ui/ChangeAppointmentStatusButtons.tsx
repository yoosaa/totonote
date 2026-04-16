"use client";

import { useState } from "react";
import type { Appointment } from "@/src/domain/appointment/model/appointment";
import type { AppointmentStatus } from "@/src/domain/appointment/model/appointmentStatus";
import { canTransitionAppointmentStatus } from "@/src/domain/appointment/services/changeAppointmentStatus";
import { changeAppointmentStatus } from "@/src/application/appointment/usecases/changeAppointmentStatus";
import { localStorageAppointmentRepository } from "@/src/infrastructure/appointment/localStorageAppointmentRepository";

type Props = {
  appointment: Appointment;
  onUpdated: (nextAppointment: Appointment) => void;
};

const statusLabelMap: Record<AppointmentStatus, string> = {
  accepted: "受付済み",
  preparing: "準備中",
  completed: "対応完了",
};

const nextStatusCandidates: AppointmentStatus[] = [
  "accepted",
  "preparing",
  "completed",
];

export function ChangeAppointmentStatusButtons({
  appointment,
  onUpdated,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const availableStatuses = nextStatusCandidates.filter(
    (status) =>
      status !== appointment.status &&
      canTransitionAppointmentStatus(appointment.status, status)
  );

  const handleChangeStatus = async (nextStatus: AppointmentStatus) => {
    setIsSubmitting(true);
    setErrorMessage("");

    const result = await changeAppointmentStatus({
      repository: localStorageAppointmentRepository,
      appointmentId: appointment.id,
      nextStatus,
      now: () => new Date().toISOString(),
    });

    if (!result.success) {
      if (result.reason === "invalid_status_transition") {
        setErrorMessage("変更できないステータスです。");
      } else if (result.reason === "not_found") {
        setErrorMessage("予約が見つかりませんでした。");
      }

      setIsSubmitting(false);
      return;
    }

    onUpdated(result.appointment);
    setIsSubmitting(false);
  };

  return (
    <section className="space-y-4 rounded-lg border p-5">
      <div className="space-y-1">
        <h2 className="text-base font-semibold">ステータス変更</h2>
        <p className="text-sm text-muted-foreground">
          現在のステータス: {statusLabelMap[appointment.status]}
        </p>
      </div>

      {availableStatuses.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          この予約はこれ以上ステータスを進められません。
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {availableStatuses.map((status) => (
            <button
              key={status}
              type="button"
              disabled={isSubmitting}
              onClick={() => {
                void handleChangeStatus(status);
              }}
              className="rounded-md border px-4 py-2 text-sm font-medium disabled:opacity-50"
            >
              {isSubmitting ? "更新中..." : `${statusLabelMap[status]}に変更`}
            </button>
          ))}
        </div>
      )}

      {errorMessage ? (
        <p className="text-sm text-red-600">{errorMessage}</p>
      ) : null}
    </section>
  );
}
