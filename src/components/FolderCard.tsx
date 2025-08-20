export default function FolderCard({ name, id }: { name: string; id: string }) {
  return (
    <div className="flex flex-col items-center m-3">
      <img src="/folder.svg" alt="photo" className="mb-2 h-30 w-30" />
      <p className="text-center font-medium text-black">{name}</p>
    </div>
  );
}
