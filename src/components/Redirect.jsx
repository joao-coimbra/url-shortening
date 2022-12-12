import { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";

import { api } from "../services/api/url.api";

import "../styles/spinner.css";

const Redirect = () => {
	const { shortId } = useParams();

	const [loading, setLoading] = useState(false);
	const [ellipsis, setEllipsis] = useState(".");

	useEffect(() => {
		api.getOne(shortId)
			.then((res) => (window.location.href = res.data[0].originURL))
			.catch(() => {
				setLoading(true);
			});
	}, [shortId]);

	useEffect(() => {
		const intervalId = setInterval(
			() =>
				setEllipsis((prevState) =>
					prevState !== "..." ? prevState + "." : "."
				),
			700
		);
		return () => clearInterval(intervalId);
	}, [ellipsis]);

	return (
		<div className='w-screen h-screen grid place-items-center bg-white dark:bg-slate-800'>
			{loading ? (
				<Wrapper />
			) : (
				<div className='flex flex-col items-center'>
					<div className='spinner'>
						<div className='bg-slate-700/80'></div>
						<div className='bg-slate-700/60'></div>
						<div className='bg-slate-700/50'></div>
						<div className='bg-slate-700/40'></div>
						<div className='bg-slate-700/30'></div>
					</div>
					<span className='dark:text-slate-600 font-semibold text-2xl mt-24'>
						Buscando{ellipsis}
					</span>
				</div>
			)}
		</div>
	);
};

const Wrapper = () => {
	return (
		<div className='absolute top-0 left-0 w-screen h-screen grid place-items-center bg-white/5 backdrop-blur'>
			<Link
				to='/'
				class='bg-red-100 max-w-[600px] rounded-lg py-5 px-6 mb-3 text-base text-red-700 flex w-full'
				role='alert'
			>
				<svg
					aria-hidden='true'
					focusable='false'
					data-prefix='fas'
					data-icon='times-circle'
					class='w-6 h-6 mr-2 fill-current'
					role='img'
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 512 512'
				>
					<path
						fill='currentColor'
						d='M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z'
					></path>
				</svg>
				<span>Nenhum url foi encontrado</span>
			</Link>
		</div>
	);
};

export default Redirect;
