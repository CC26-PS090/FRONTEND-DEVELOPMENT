import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Label } from "recharts";
import { useMode } from "@/contexts/ModeContext";
import { formatIDR } from "@/utils/currency";

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

/**
 * Donut pie chart for category distribution with a centered label.
 * Adapts label color to current theme (light/dark).
 *
 * @param {{ data: Array<{ name: string, value: number, color: string }> }} props
 */
export default function CategoryPieChart({ data }) {
  const { theme } = useMode();
  const textColor = theme === "dark" ? "#ffffff" : "#000000";

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={65}
          outerRadius={85}
          paddingAngle={5}
          dataKey="value"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
          <Label
            value={data[0]?.name || ""}
            position="center"
            fill={textColor}
            style={{ fontSize: '12px', fontWeight: 'bold' }}
          />
        </Pie>
        <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
      </PieChart>
    </ResponsiveContainer>
  );
}