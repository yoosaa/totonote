import { AppointmentEditPage } from "@/src/presentation/pages/appointment-edit-page/ui/AppointmentEditPage";

type Props = {
  params: Promise<{
    appointmentId: string;
  }>;
};

export default async function AppointmentEditRoute({ params }: Props) {
  const { appointmentId } = await params;

  return <AppointmentEditPage appointmentId={appointmentId} />;
}
