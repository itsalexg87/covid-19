import React from 'react';
import styles from './Cards.module.css';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';

import CountUp from 'react-countup';
import cx from 'classnames';

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate }, country }) => {
	if (!confirmed) {
		return 'Loading ...';
	}
	console.log(country);
	return (
		<div className={styles.container}>
			<Grid container spacing={3} justify='center'>
				<Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
					<CardContent>
						<Typography variant='h6' color='textSecondary' gutterBottom>
							Infected
						</Typography>
						<Typography variant='h5'>
							<CountUp start={0} end={confirmed.value} duration={1.5} separator='.' />
						</Typography>
						<Typography variant='body2' color='textSecondary'>
							{new Date(lastUpdate).toLocaleDateString()}
						</Typography>
						<Typography variant='body1' className={styles.numberOf}>
							Number of active cases of COVID-19
						</Typography>
					</CardContent>
				</Grid>
				<Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>
					<CardContent>
						<Typography variant='h6' color='textSecondary' gutterBottom>
							Recovered
						</Typography>
						<Typography variant='h5'>
							<CountUp start={0} end={recovered.value} duration={1.5} separator='.' />
						</Typography>
						<Typography variant='body2' color='textSecondary'>
							{new Date(lastUpdate).toLocaleDateString()}
						</Typography>
						<Typography variant='body1' className={styles.numberOf}>
							Number of recoveries from COVID-19
						</Typography>
					</CardContent>
				</Grid>
				<Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
					<CardContent>
						<Typography variant='h6' color='textSecondary' gutterBottom>
							Deaths
						</Typography>
						<Typography variant='h5'>
							<CountUp start={0} end={deaths.value} duration={1.5} separator='.' />
						</Typography>
						<Typography variant='body2' color='textSecondary'>
							{new Date(lastUpdate).toLocaleDateString()}
						</Typography>
						<Typography variant='body1' className={styles.numberOf}>
							Number of deaths caused by COVID-19
						</Typography>
					</CardContent>
				</Grid>
			</Grid>
		</div>
	);
};

export default Cards;
