import React from 'react'

import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import { options } from './VerticalChart';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export const data = {
    labels: ['Klausul 8', 'Klausul 9', 'klausul 10'],
    datasets: [
        {
            label: 'Traffic Source',
            data: [1200, 1900, 3000],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
            ],

        },
    ],
    options: {
        responsive: true,
    }
};


const PolarAreaChart = () => {
    return (
        <>
            <PolarArea options={options} data={data} />
        </>
    )
}

export default PolarAreaChart