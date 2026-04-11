import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { formatIDR } from "@/utils/currency";

/**
 * Donut pie chart showing expense distribution by category.
 * @param {{ data: Array<{ name: string, value: number, color: string }> }} props
 */
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const entry = payload[0];
    return (
      <div className="bg-card border border-border p-3 rounded-xl shadow-lg">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.payload.color || entry.color }} />
          <span className="font-medium text-foreground">{entry.name} :</span>
          <span className="font-bold text-foreground">{formatIDR(entry.value)}</span>
        </div>
      </div>
    );
  }
  return null;
};

export default function DistributionPieChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={90}
          paddingAngle={5}
          dataKey="value"
          stroke="none"
        >
          {data.map((entry, index) => (
             <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
      </PieChart>
    </ResponsiveContainer>
  );
}
