export type AppointmentDraftField =
  | "customerName"
  | "serviceName"
  | "scheduledAt"
  | "note"
  | "preparationItems"
  | "visitNote";

export type ValidationIssue = {
  field: AppointmentDraftField;
  message: string;
};

export type ValidationResult = {
  success: boolean;
  issues: ValidationIssue[];
};
