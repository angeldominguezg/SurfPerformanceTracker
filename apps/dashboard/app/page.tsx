import { PanelHeader } from "../components/PanelHeader";
import { ForecastCard } from "../components/ForecastCard";

export default function Home() {
  return (
    <main>
      <PanelHeader />
      <section className="p-6 grid gap-4">
        <ForecastCard />
      </section>
    </main>
  );
}
