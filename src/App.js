import React, { Component } from 'react';

import { Cards, Chart, CountryPicker } from './components';
import { fetchData } from './api';
import styles from './App.module.css';

import { Typography } from '@material-ui/core';

class App extends Component {
	state = { data: {}, country: '' };

	async componentDidMount() {
		const fetchedData = await fetchData();
		this.setState({ data: fetchedData });
	}

	handleCountryChange = async country => {
		const fetchedData = await fetchData(country);
		this.setState({ data: fetchedData, country });
	};

	render() {
		const { data, country } = this.state;
		return (
			<div className={styles.container}>
				<Cards data={data} country={country} />
				<Typography variant='body2' gutterBottom style={{ marginBottom: '20px' }}>
					Data fetched from{' '}
					<a href='https://covid19.mathdro.id/api' target='_blank' rel='noreferrer'>
						https://covid19.mathdro.id/api
					</a>
				</Typography>
				<CountryPicker handleCountryChange={this.handleCountryChange} />
				<Chart data={data} country={country} />
			</div>
		);
	}
}

export default App;
