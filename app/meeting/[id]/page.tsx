interface MeetingPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MeetingDetailPage({ params }: MeetingPageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen p-8 bg-app">
      <div>
        <h1 className="text-section-headline font-bold text-text-primary mb-2">Meeting Detail</h1>
        <p className="text-text-secondary text-body-base">Meeting ID: {id}</p>
      </div>
    </main>
  );
}
