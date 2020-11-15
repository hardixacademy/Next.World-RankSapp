import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Layout.module.scss';

function Layout({ children, title = 'World Rank', description = 'World Rank description' }) {
	return (
		<div className={styles.container}>
			<Head>
				<link rel='icon' href='/favicon.ico' />
				<meta httpEquiv='X-UA-Compatible' content='ie=edge' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
				<title>{title}</title>
				<meta name='description' content={description} />
			</Head>

			<header className={styles.header}>
				<Link href='/'>
					<img src='/Logo.svg' alt='Logo' />
				</Link>
			</header>

			<main className={styles.main}>{children}</main>

			<footer className={styles.footer}>Artem Onufriichuk @NOXU.Solutions</footer>
		</div>
	);
}

export default Layout;
