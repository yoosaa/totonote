import { AppointmentDetailPage } from "@/src/presentation/pages/appointment-detail-page/ui/AppointmentDetailPage";

type Props = {
  params: Promise<{
    appointmentId: string;
  }>;
};

export default async function AppointmentDetailRoute({ params }: Props) {
  const { appointmentId } = await params;

  return <AppointmentDetailPage appointmentId={appointmentId} />;
}
