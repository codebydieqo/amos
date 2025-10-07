import PageHeader from "@/components/page-header";

export default async function Article({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div>
      <PageHeader title={id} />
    </div>
  );
}
