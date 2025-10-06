export default function PageHeader({ title }: { title: string }) {
  return (
    <div className="w-full h-28 border-b px-5 flex justify-start items-center">
      <p className="text-5xl font-black">{title}</p>
    </div>
  );
}
