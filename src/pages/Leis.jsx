import { MainLayout } from "../components/layout/MainLayout";
import { leisData } from "../data/leis";
import { LeiCard } from "../components/leis/LeiCard.jsx";

export default function Leis() {
  return (
    <MainLayout title="Leis">
      <div className="px-4 py-4 overflow-y-auto flex-1">
        {leisData.map((lei) => (
          <LeiCard key={lei.id} lei={lei} />
        ))}
      </div>
    </MainLayout>
  );
}
