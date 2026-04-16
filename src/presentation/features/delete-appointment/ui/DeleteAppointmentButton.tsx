import { deleteAppointment } from "@/src/application/appointment/usecases/deleteAppointment";
import { localStorageAppointmentRepository } from "@/src/infrastructure/appointment/localStorageAppointmentRepository";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  appointmentId: string;
};

export function DeleteAppointmentButton({ appointmentId }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = async () => {
    const confirmed = window.confirm("この予約を削除しますか？");

    if (!confirmed) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    const result = await deleteAppointment({
      repository: localStorageAppointmentRepository,
      appointmentId,
    });

    if (!result.success) {
      if (result.reason === "not_found") {
        setErrorMessage("削除対象の予約が見つかりませんでした。");
      } else {
        setErrorMessage("予約の削除に失敗しました。");
      }

      setIsSubmitting(false);
      return;
    }

    router.push("/appointments");
    router.refresh();
  };

  return (
    <div className="space-y-2">
      <button
        className="rounded-md border px-4 py-2 text-sm font-medium disabled:opacity-50"
        type="button"
        disabled={isSubmitting}
        onClick={() => {
          void handleDelete();
        }}
      >
        {isSubmitting ? "削除中..." : "削除"}
      </button>

      {errorMessage ? (
        <p className="text-sm text-red-600">{errorMessage}</p>
      ) : null}
    </div>
  );
}
