import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { BarChart } from "@mui/x-charts/BarChart";

export default function BarChartCard() {
  const [data, setData] = useState<{ label: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // onSnapshot permite atualização em tempo real (Real-time)
    const unsubscribe = onSnapshot(collection(db, "respostas"), (snapshot) => {
      const counts: Record<string, number> = {};
      
      snapshot.forEach((doc) => {
        const res = doc.data().opcao; // Supondo campo 'opcao' no Firestore
        if (res) {
          counts[res] = (counts[res] || 0) + 1;
        }
      });

      const formattedData = Object.keys(counts).map((key) => ({
        label: key,
        value: counts[key],
      }));

      setData(formattedData);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup ao desmontar
  }, []);

  if (loading) return <p>Carregando dados das respostas...</p>;

  return (
    <BarChart
      dataset={data}
      xAxis={[{ scaleType: 'band', dataKey: 'label' }]}
      series={[{ dataKey: 'value', label: 'Total de Respostas' }]}
      width={500}
      height={300}
    />
  );
}