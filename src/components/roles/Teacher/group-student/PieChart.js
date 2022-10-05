import React, {memo} from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Legend } from "chart.js/auto";

export const PieChart = memo(({ chartData }) => {
    console.log(chartData)

    return (
        <Pie data={chartData} />
    );
})
