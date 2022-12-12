import React, {memo} from "react";
import { Pie } from "react-chartjs-2";

export const PieChart = memo(({ chartData }) => {
    return (
        <Pie data={chartData} />
    );
})
