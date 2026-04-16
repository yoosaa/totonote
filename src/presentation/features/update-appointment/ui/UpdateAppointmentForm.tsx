import { Appointment } from "@/src/domain/appointment/model/appointment";
import { useUpdateAppointment } from "../model/useUpdateAppointment";
import { AppointmentFormFields } from "@/src/presentation/widgets/appointment-editor/ui/AppointmentFormFields";

type Props = {
  appointment: Appointment;
};

export function UpdateAppointmentForm({ appointment }: Props) {
  const { draft, fieldErrors, isSubmitting, updateDraft, submit } =
    useUpdateAppointment(appointment);

  return (
    <form
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
          className="rounded-md border px-4 py-2 text-sm font-medium disabled:opacity-50"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "保存中..." : "更新する"}
        </button>
      </div>
    </form>
  );
}
