import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import { fetchDailyData } from '../../api';

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
	const [dailyData, setDailyData] = useState([]);

	useEffect(() => {
		const fetchAPI = async () => {
			setDailyData(await fetchDailyData());
		};

		fetchAPI();
	}, []);

	const lineChart =
		dailyData.length !== 0 ? (
			<Line
				className={styles.chart}
				data={{
					labels: dailyData.map(({ date }) => date),
					datasets: [
						{
							data: dailyData.map(({ confirmed }) => confirmed),
							label: 'Infected',
							boderColor: 'blue',
							backgroundColor: 'rgba(0, 0, 255, 0.5)',
							fill: true,
							yAxisID: 'infected',
						},
						{
							data: dailyData.map(({ deaths }) => deaths),
							label: 'Deaths',
							boderColor: 'red',
							backgroundColor: 'rgba(255, 0, 0, 0.5)',
							fill: true,
							yAxisID: 'deaths',
						},
					],
				}}
				options={{
					scales: {
						yAxes: [
							{
								ticks: {
									beginAtZero: true,
									stepSize: 10000000,
									userCallback: function (value, index, values) {
										value = value.toString() / 1000000;
										return value;
									},
								},
								id: 'infected',
								type: 'linear',
								stacked: true,
								scaleLabel: { display: true, labelString: 'Infected (MM)', fontColor: '#3333ff' },
							},
							{
								ticks: {
									beginAtZero: true,
									stepSize: 500000,
									userCallback: function (value, index, values) {
										value = value.toString() / 1000000;
										return value;
									},
								},
								id: 'deaths',
								type: 'linear',
								position: 'right',
								scaleLabel: { display: true, labelString: 'Deaths (MM)', fontColor: 'rgba(255, 0, 0, 0.5)' },
							},
						],
					},
				}}
			/>
		) : null;

	const barChart = confirmed ? (
		<Bar
			className={styles.chart}
			data={{
				labels: ['Infected', 'Recovered', 'Deaths'],
				datasets: [
					{
						label: 'People',
						backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
						data: [confirmed.value, recovered.value, deaths.value],
					},
				],
			}}
			options={{ legend: { display: false, title: { display: true, text: `Current State in ${country}` } } }}
		/>
	) : null;

	return <div className={styles.container}>{country ? barChart : lineChart}</div>;
};

export default Chart;
