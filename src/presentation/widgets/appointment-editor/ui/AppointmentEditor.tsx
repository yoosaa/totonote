import { Appointment } from "@/src/domain/appointment/model/appointment";
import { CreateAppointmentForm } from "@/src/presentation/features/create-appointment/ui/CreateAppointmentForm";
import { UpdateAppointmentForm } from "@/src/presentation/features/update-appointment/ui/UpdateAppointmentForm";

type CreateModeProps = {
  mode: "create";
};

type EditModeProps = {
  mode: "edit";
  appointment: Appointment;
};

type Props = CreateModeProps | EditModeProps;

export function AppointmentEditor(props: Props) {
  if (props.mode === "create") {
    return <CreateAppointmentForm />;
  }

  return <UpdateAppointmentForm appointment={props.appointment} />;
}
