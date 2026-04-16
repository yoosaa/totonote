"use client";

import { updateAppointment } from "@/src/application/appointment/usecases/updateAppointment";
import { Appointment } from "@/src/domain/appointment/model/appointment";
import { AppointmentDraft } from "@/src/domain/appointment/model/appointmentDraft";
import { AppointmentDraftField } from "@/src/domain/appointment/validation/validationResult";
import { localStorageAppointmentRepository } from "@/src/infrastructure/appointment/localStorageAppointmentRepository";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type FieldErrors = Partial<Record<AppointmentDraftField, string[]>>;

const toFieldErrors = (
  issues: { field: AppointmentDraftField; message: string }[]
): FieldErrors => {
  return issues.reduce<FieldErrors>((acc, issue) => {
    const current = acc[issue.field] ?? [];
    acc[issue.field] = [...current, issue.message];
    return acc;
  }, {});
};

const toDateTimeLocalValue = (value: string): string => {
  if (!value) return "";

  const date = new Date(value);
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);

  return localDate.toISOString().slice(0, 16);
};

const toDraft = (appointment: Appointment): AppointmentDraft => {
  return {
    customerName: appointment.customerName,
    serviceName: appointment.serviceName,
    scheduledAt: toDateTimeLocalValue(appointment.scheduledAt),
    note: appointment.note,
    status: appointment.status,
    preparationItems: appointment.preparationItems,
    visitNote: appointment.visitNote,
  };
};

export function useUpdateAppointment(appointment: Appointment) {
  const router = useRouter();
  const initialDraft = useMemo(() => toDraft(appointment), [appointment]);

  const [draft, setDraft] = useState<AppointmentDraft>(initialDraft);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateDraft = (
    updater: (current: AppointmentDraft) => AppointmentDraft
  ) => {
    setDraft((current) => updater(current));
  };

  const submit = async () => {
    setIsSubmitting(true);
    setFieldErrors({});

    const normalizedDraft: AppointmentDraft = {
      ...draft,
      scheduledAt: draft.scheduledAt
        ? new Date(draft.scheduledAt).toISOString()
        : draft.scheduledAt,
    };

    const result = await updateAppointment({
      repository: localStorageAppointmentRepository,
      appointmentId: appointment.id,
      draft: normalizedDraft,
      now: () => new Date().toISOString(),
    });

    if (!result.success) {
      if (result.reason === "validation_error") {
        setFieldErrors(toFieldErrors(result.issues));
      }

      setIsSubmitting(false);
      return;
    }

    router.push(`/appointment/${result.appointment.id}`);
    router.refresh();
  };

  return {
    draft,
    fieldErrors,
    isSubmitting,
    updateDraft,
    submit,
  };
}
