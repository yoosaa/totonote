"use client";

import { createAppointment } from "@/src/application/appointment/usecases/createAppointment";
import { createEmptyAppointmentDraft } from "@/src/domain/appointment/factories/createEmptyAppointmentDraft";
import { AppointmentDraft } from "@/src/domain/appointment/model/appointmentDraft";
import { AppointmentDraftField } from "@/src/domain/appointment/validation/validationResult";
import { localStorageAppointmentRepository } from "@/src/infrastructure/appointment/localStorageAppointmentRepository";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

export function useCreateAppointment() {
  const router = useRouter();
  const [draft, setDraft] = useState<AppointmentDraft>(
    createEmptyAppointmentDraft()
  );
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

    const normalizeDraft = {
      ...draft,
      scheduledAt: draft.scheduledAt
        ? new Date(draft.scheduledAt).toISOString()
        : draft.scheduledAt,
    };

    const result = await createAppointment({
      repository: localStorageAppointmentRepository,
      draft: normalizeDraft,
      generateId: () => crypto.randomUUID(),
      now: () => new Date().toISOString(),
    });

    if (!result.success) {
      setFieldErrors(toFieldErrors(result.issues));
      setIsSubmitting(false);
      return;
    }

    router.push(`/appointments/${result.appointment.id}`);
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
