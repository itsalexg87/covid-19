import React from 'react';
import styles from './Cards.module.css';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';

import CountUp from 'react-countup';

const CardTemplate = ({ cN, name, value, lastUpdate, description, colorText }) => {
	return (
		<Grid item component={Card} xs={12} md={2} className={cN}>
			<CardContent>
				<Typography variant='h6' style={{ color: colorText }} gutterBottom>
					{name}
				</Typography>
				<Typography variant='h5'>
					<CountUp start={0} end={value} duration={1.5} separator='.' />
				</Typography>
				<Typography variant='body2' color='textSecondary' gutterBottom>
					{new Date(lastUpdate).toLocaleDateString()}
				</Typography>
				<Typography variant='body1' className={styles.numberOf}>
					{description}
				</Typography>
			</CardContent>
		</Grid>
	);
};

export default CardTemplate;
