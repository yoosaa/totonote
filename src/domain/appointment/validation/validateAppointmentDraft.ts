import type { AppointmentDraft } from "../model/appointmentDraft";
import { ValidationIssue, ValidationResult } from "./validationResult";

const MAX_CUSTOMER_NAME_LENGTH = 50;
const MAX_SERVICE_NAME_LENGTH = 50;
const MAX_NOTE_LENGTH = 1000;
const MAX_VISIT_NOTE_LENGTH = 2000;
const MAX_PREPARATION_ITEM_LABEL_LENGTH = 100;

export const validateAppointmentDraft = (
  draft: AppointmentDraft
): ValidationResult => {
  const issues: ValidationIssue[] = [];

  const customerName = draft.customerName.trim();
  const serviceName = draft.serviceName.trim();
  const note = draft.note.trim();
  const visitNoteBody = draft.visitNote.body.trim();

  if (customerName.length === 0) {
    issues.push({
      field: "customerName",
      message: "顧客名は必須です。",
    });
  }

  if (customerName.length > MAX_CUSTOMER_NAME_LENGTH) {
    issues.push({
      field: "customerName",
      message: `顧客名は${MAX_CUSTOMER_NAME_LENGTH}文字以内で入力してください。`,
    });
  }

  if (serviceName.length === 0) {
    issues.push({
      field: "serviceName",
      message: "サービス名は必須です。",
    });
  }

  if (serviceName.length > MAX_SERVICE_NAME_LENGTH) {
    issues.push({
      field: "serviceName",
      message: `サービス名は${MAX_SERVICE_NAME_LENGTH}文字以内で入力してください。`,
    });
  }

  if (draft.scheduledAt.trim().length === 0) {
    issues.push({
      field: "scheduledAt",
      message: "予約日時は必須です。",
    });
  }

  if (note.length > MAX_NOTE_LENGTH) {
    issues.push({
      field: "note",
      message: `予約メモは${MAX_NOTE_LENGTH}文字以内で入力してください。`,
    });
  }

  if (visitNoteBody.length > MAX_VISIT_NOTE_LENGTH) {
    issues.push({
      field: "visitNote",
      message: `来店後メモは${MAX_VISIT_NOTE_LENGTH}文字以内で入力してください。`,
    });
  }

  const hasEmptyPreparationItem = draft.preparationItems.some(
    (item) => item.label.trim().length === 0
  );

  if (hasEmptyPreparationItem) {
    issues.push({
      field: "preparationItems",
      message: "事前準備項目に空欄があります。",
    });
  }

  const hasTooLongPreparationItem = draft.preparationItems.some(
    (item) =>
      item.label.trim().length > 0 &&
      item.label.trim().length > MAX_PREPARATION_ITEM_LABEL_LENGTH
  );

  if (hasTooLongPreparationItem) {
    issues.push({
      field: "preparationItems",
      message: `事前準備項目は${MAX_PREPARATION_ITEM_LABEL_LENGTH}文字以内で入力してください。`,
    });
  }

  return {
    success: issues.length === 0,
    issues,
  };
};
