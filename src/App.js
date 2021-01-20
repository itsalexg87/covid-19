import React, { Component } from 'react';

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';

import image from './images/image.png';

// export const setData = async data => {
// 	await this.setState({ data });
// };

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
				<img src={image} alt='COVID-19' className={styles.image} />
				<Cards data={data} country={country} />
				<CountryPicker handleCountryChange={this.handleCountryChange} />
				<Chart data={data} country={country} />
			</div>
		);
	}
}

export default App;
