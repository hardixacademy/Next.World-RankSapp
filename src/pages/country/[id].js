import { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import styles from './Country.module.scss';
import Link from 'next/link';

const getCountry = async (id) => {
	const res = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);
	const country = await res.json();

	return country;
};

const Country = ({ country }) => {
	const [borders, setBorders] = useState([]);

	const getBorders = async () => {
		const borders = await Promise.all(country.borders.map((border) => getCountry(border)));
		setBorders(borders);
	};

	useEffect(() => {
		getBorders();
	}, [country]);

	return (
		<Layout title={country.name}>
			<div className={styles.container}>
				<div className={styles.container__left}>
					<div className={styles.overviewPanel}>
						<img src={country.flag} alt={country.name} />
						<h1 className={styles.overviewPanel__name}>{country.name}</h1>
						<div className={styles.overviewPanel__region}>{country.region}</div>

						<div className={styles.overviewPanel__box}>
							<div className={styles.overviewPanel__population}>
								<div className={styles.overviewPanel__value}>{country.population}</div>
								<div className={styles.overviewPanel__label}>Population</div>
							</div>
							<div className={styles.overviewPanel__area}>
								<div className={styles.overviewPanel__value}>
									{country.area} (km <sup>2</sup>)
								</div>
								<div className={styles.overviewPanel__label}>Area</div>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.container__right}>
					<div className={styles.detailsPanel}>
						<h4 className={styles.detailsPanel__title}>Details</h4>

						<div className={styles.detailsPanel__box}>
							<div className={styles.detailsPanel__label}>Capital</div>
							<div className={styles.detailsPanel__value}>{country.capital}</div>
						</div>
						<div className={styles.detailsPanel__box}>
							<div className={styles.detailsPanel__label}>Subregion</div>
							<div className={styles.detailsPanel__value}>{country.subregion}</div>
						</div>
						<div className={styles.detailsPanel__box}>
							<div className={styles.detailsPanel__label}>Languages</div>
							<div className={styles.detailsPanel__value}>{country.languages.map(({ name }) => name).join(', ')}</div>
						</div>
						<div className={styles.detailsPanel__box}>
							<div className={styles.detailsPanel__label}>Currencies</div>
							<div className={styles.detailsPanel__value}>{country.currencies.map(({ name, symbol }) => `${name} (${symbol})`).join(', ')}</div>
						</div>
						<div className={styles.detailsPanel__box}>
							<div className={styles.detailsPanel__label}>Native name</div>
							<div className={styles.detailsPanel__value}>{country.nativeName}</div>
						</div>
						<div className={styles.detailsPanel__box}>
							<div className={styles.detailsPanel__label}>Gini</div>
							<div className={styles.detailsPanel__value}>{country.gini} %</div>
						</div>
						<div className={styles.detailsPanel__borders}>
							<div className={styles.detailsPanel__label}>Neighboring countries</div>

							<div className={styles.detailsPanel__borders__container}>
								{borders.map(({ flag, name, alpha3Code }) => (
									<Link href={`/country/${alpha3Code}`}>
										<div className={styles.detailsPanel__borders__country}>
											<img src={flag} alt={name} />
											<div className={styles.detailsPanel__borders__name}>{name}</div>
										</div>
									</Link>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Country;

export const getStaticPaths = async () => {
	const res = await fetch('https://restcountries.eu/rest/v2/all');
	const countries = await res.json();

	const paths = countries.map((country) => ({
		params: { id: country.alpha3Code },
	}));

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps = async ({ params }) => {
	const country = await getCountry(params.id);
	return {
		props: {
			country,
		},
	};
};
