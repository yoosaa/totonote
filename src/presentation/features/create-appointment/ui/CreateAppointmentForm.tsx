"use client";

import { useEffect, useState } from "react";
import { useCreateAppointment } from "../model/useCreateAppointment";
import { AppointmentFormFields } from "@/src/presentation/widgets/appointment-editor/ui/AppointmentFormFields";

export function CreateAppointmentForm() {
  const { draft, fieldErrors, isSubmitting, updateDraft, submit } =
    useCreateAppointment();
  const [isClientReady, setIsClientReady] = useState(false);

  useEffect(() => {
    setIsClientReady(true);
  }, []);

  return (
    <form
      data-client-ready={isClientReady ? "true" : "false"}
      className="space-y-6"
      onSubmit={(event) => {
        event.preventDefault();
        void submit();
      }}
    >
      <AppointmentFormFields
        draft={draft}
        fieldErrors={fieldErrors}
        onChange={updateDraft}
      />

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md border px-4 py-2 text-sm font-medium disabled:opacity-50"
        >
          {isSubmitting ? "保存中..." : "予約を作成"}
        </button>
      </div>
    </form>
  );
}
