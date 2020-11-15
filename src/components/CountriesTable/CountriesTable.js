import Link from 'next/link';
import styles from './CountriesTable.module.scss';
import KeyboardArrowDownRounded from '@material-ui/icons/KeyboardArrowDownRounded';
import KeyboardArrowUpRounded from '@material-ui/icons/KeyboardArrowUpRounded';
import { useState } from 'react';

const orderBy = (countries, value, direction) => {
	if (direction === 'asc') {
		return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
	}

	if (direction === 'desc') {
		return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
	}

	return countries;
};

const SortArrow = ({ direction }) => {
	if (!direction) {
		return <></>;
	}

	if (direction === 'desc') {
		return (
			<div className={styles.heading__arrow}>
				<KeyboardArrowDownRounded color='inherit' />
			</div>
		);
	} else {
		return (
			<div className={styles.heading__arrow}>
				<KeyboardArrowUpRounded color='inherit' />
			</div>
		);
	}
};

function CountriesTable({ countries }) {
	const [direction, setDirection] = useState();
	const [value, setValue] = useState();

	const orderedCountries = orderBy(countries, value, direction);

	const switchDirection = () => {
		if (!direction) {
			setDirection('desc');
		} else if (direction === 'desc') {
			setDirection('asc');
		} else {
			setDirection(null);
		}
	};

	const setValueAndDirection = (value) => {
		switchDirection();
		setValue(value);
	};

	return (
		<div>
			<div className={styles.heading}>
				<div className={styles.heading__flag}></div>
				<button className={styles.heading__name} onClick={() => setValueAndDirection('name')}>
					Name
					{value === 'name' && <SortArrow direction={direction} />}
				</button>
				<button className={styles.heading__population} onClick={() => setValueAndDirection('population')}>
					Population
					{value === 'population' && <SortArrow direction={direction} />}
				</button>
				<button className={styles.heading__area} onClick={() => setValueAndDirection('area')}>
					Area (km <sup style={{ fontSize: '0.5rem' }}>2</sup>){value === 'area' && <SortArrow direction={direction} />}
				</button>
				<button className={styles.heading__gini} onClick={() => setValueAndDirection('gini')}>
					Gini
					{value === 'gini' && <SortArrow direction={direction} />}
				</button>
			</div>

			{orderedCountries.map((item, i) => (
				<Link href={`/country/${item.alpha3Code}`} key={i}>
					<div className={styles.country}>
						<div className={styles.country__flag}>
							<img src={item.flag} alt={item.name} />
						</div>
						<div className={styles.country__name}>{item.name}</div>
						<div className={styles.country__population}>{item.population}</div>
						<div className={styles.country__area}>{item.area || 0}</div>
						<div className={styles.country__gini}>{item.gini || 0} %</div>
					</div>
				</Link>
			))}
		</div>
	);
}

export default CountriesTable;
