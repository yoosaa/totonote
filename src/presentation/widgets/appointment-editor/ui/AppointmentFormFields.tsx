"use client";

import { AppointmentDraft } from "@/src/domain/appointment/model/appointmentDraft";
import { AppointmentDraftField } from "@/src/domain/appointment/validation/validationResult";
import { PreparationItemsField } from "@/src/presentation/entities/preparation-item/ui/PreparationItemsField";

type FieldErrors = Partial<Record<AppointmentDraftField, string[]>>;

type Props = {
  draft: AppointmentDraft;
  fieldErrors: FieldErrors;
  onChange: (updater: (current: AppointmentDraft) => AppointmentDraft) => void;
};

export function AppointmentFormFields({ draft, fieldErrors, onChange }: Props) {
  return (
    <>
      <section className="space-y-4 rounded-lg border p-4">
        <h2 className="text-base font-semibold">基本情報</h2>

        <div className="space-y-2">
          <label htmlFor="customerName" className="text-sm font-medium">
            顧客名
          </label>
          <input
            id="customerName"
            value={draft.customerName}
            onChange={(event) =>
              onChange((current) => ({
                ...current,
                customerName: event.target.value,
              }))
            }
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
          {fieldErrors.customerName?.map((message) => (
            <p className="text-sm text-red-600" key={message}>
              {message}
            </p>
          ))}
        </div>

        <div className="space-y-2">
          <label htmlFor="serviceName" className="text-sm font-medium">
            サービス名
          </label>
          <input
            id="serviceName"
            value={draft.serviceName}
            onChange={(event) =>
              onChange((current) => ({
                ...current,
                serviceName: event.target.value,
              }))
            }
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
          {fieldErrors.serviceName?.map((message) => (
            <p key={message} className="text-sm text-red-600">
              {message}
            </p>
          ))}
        </div>

        <div className="space-y-2">
          <label htmlFor="scheduledAt" className="text-sm font-medium">
            予約日時
          </label>
          <input
            id="scheduledAt"
            type="datetime-local"
            value={draft.scheduledAt}
            onChange={(event) =>
              onChange((current) => ({
                ...current,
                scheduledAt: event.target.value,
              }))
            }
            className="w-full rounded-md border px-3 py-2 text-sm"
          />
          {fieldErrors.scheduledAt?.map((message) => (
            <p key={message} className="text-sm text-red-600">
              {message}
            </p>
          ))}
        </div>

        <div className="space-y-2">
          <label htmlFor="note" className="text-sm font-medium">
            予約メモ
          </label>
          <textarea
            id="note"
            value={draft.note}
            onChange={(event) =>
              onChange((current) => ({
                ...current,
                note: event.target.value,
              }))
            }
            className="min-h-24 w-full rounded-md border px-3 py-2 text-sm"
          />
          {fieldErrors.note?.map((message) => (
            <p key={message} className="text-sm text-red-600">
              {message}
            </p>
          ))}
        </div>
      </section>

      <PreparationItemsField
        items={draft.preparationItems}
        errors={fieldErrors.preparationItems}
        onChange={(items) =>
          onChange((current) => ({
            ...current,
            preparationItems: items,
          }))
        }
      />

      <section className="space-y-4 rounded-lg border p-4">
        <h2 className="text-base font-semibold">基本情報</h2>

        <div className="space-y-2">
          <label htmlFor="visitNote" className="text-sm font-medium">
            メモ
          </label>
          <textarea
            id="visitNote"
            value={draft.visitNote.body}
            onChange={(event) =>
              onChange((current) => ({
                ...current,
                visitNote: { body: event.target.value },
              }))
            }
            className="min-h-24 w-full rounded-md border px-3 py-2 text-sm"
          />
          {fieldErrors.visitNote?.map((message) => (
            <p key={message} className="text-sm text-red-600">
              {message}
            </p>
          ))}
        </div>
      </section>
    </>
  );
}
