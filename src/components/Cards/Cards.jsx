import React from 'react';
import cx from 'classnames';

import { Grid } from '@material-ui/core';
import styles from './Cards.module.css';

import CardTemplate from './CardTemplate';

const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate }, country }) => {
	if (!confirmed) {
		return 'Loading ...';
	}
	console.log(country);

	const activeCases = confirmed.value - recovered.value - deaths.value;

	return (
		<div className={styles.container}>
			<Grid container spacing={3} justify='center'>
				<CardTemplate
					cN={cx(styles.card, styles.infected)}
					name='Total Infected'
					value={confirmed.value}
					lastUpdate={lastUpdate}
					colorText='rgba(0, 0, 255, 1)'
					description='All Cases from the beginning of COVID-19'
				/>
				<CardTemplate
					cN={cx(styles.card, styles.active)}
					name='Active Cases'
					value={activeCases}
					lastUpdate={lastUpdate}
					colorText=' rgba(255, 136, 0, 1)'
					description='Number of active cases of COVID-19'
				/>
				<CardTemplate
					cN={cx(styles.card, styles.recovered)}
					name='Recovered'
					value={recovered.value}
					lastUpdate={lastUpdate}
					colorText='rgba(0, 255, 0, 1)'
					description='Number of recoveries from COVID-19'
				/>
				<CardTemplate
					cN={cx(styles.card, styles.deaths)}
					name='Deaths'
					value={deaths.value}
					lastUpdate={lastUpdate}
					colorText=' rgba(255, 0, 0, 1)'
					description='Number of deaths caused by COVID-19'
				/>
			</Grid>
		</div>
	);
};

export default Cards;
