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

	console.log(dailyData);

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

									// Return an empty string to draw the tick line but hide the tick label
									// Return `null` or `undefined` to hide the tick line entirely
									userCallback: function (value, index, values) {
										// Convert the number to a string and splite the string every 3 charaters from the end
										value = value.toString();
										value = value.split(/(?=(?:...)*$)/);

										// Convert the array to a string and format the output
										value = value.join('.');
										return value;
									},
								},
								id: 'infected',
								type: 'linear',
								stacked: true,
								scaleLabel: { display: true, labelString: 'Infected', fontColor: '#3333ff' },
							},
							{
								ticks: {
									beginAtZero: true,
									stepSize: 500000,

									// Return an empty string to draw the tick line but hide the tick label
									// Return `null` or `undefined` to hide the tick line entirely
									userCallback: function (value, index, values) {
										// Convert the number to a string and splite the string every 3 charaters from the end
										value = value.toString();
										value = value.split(/(?=(?:...)*$)/);

										// Convert the array to a string and format the output
										value = value.join('.');
										return value;
									},
								},
								id: 'deaths',
								type: 'linear',
								position: 'right',
								scaleLabel: { display: true, labelString: 'Deaths', fontColor: 'rgba(255, 0, 0, 0.5)' },
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
