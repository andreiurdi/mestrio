export default function ClientProviderDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <div>Provider {params.id}</div>;
}
