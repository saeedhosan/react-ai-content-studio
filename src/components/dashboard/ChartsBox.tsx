import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { FunctionComponent } from "react";
import { Payload } from "recharts/types/component/DefaultLegendContent";

interface CustomTooltipProps {
  active?: boolean;
  payload?: Payload[];
  label?: string | number;
}

const CustomTooltip: FunctionComponent<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`Document: ${label}`}</p>
        <p className="label">{`Words used : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ChartsBox({ data = [] }: { data?: any[] }) {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="pv" barSize={20} fill={"var(--bg-primary)"} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
