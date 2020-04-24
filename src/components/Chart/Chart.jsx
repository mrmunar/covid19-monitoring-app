import React, {useState, useEffect} from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

export default function Chart({ data: { confirmed, deaths, recovered }, country }) {
    const [dailyData, setDailyData] = useState([]);
    
    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        };

        fetchAPI();
    }, []);

    const lineChart = (
        dailyData.length
            ? (
            <Line
                data={{
                    labels: dailyData.map(({ date }) => date),
                    datasets: [{
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill: true,
                    }, {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true,
                    }],
                }}
            />) : null
    );

    const barChart = (
        confirmed
            ? (
                <Bar
                    data={{
                        labels: ['Infected', 'Deaths', 'Recovered'],
                        datasets: [{
                            label: 'People',
                            backgroundColor: ['orange', 'red', 'green'],
                            data: [confirmed.value, deaths.value, recovered.value]
                        }]
                    }}
                    options={{
                        legend: { display: false },
                        title: { display: true, text: `Current state in ${country}`},
                    }}
                />
            ) : null
    );

    console.log([confirmed, deaths, recovered]);

    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    );
}
