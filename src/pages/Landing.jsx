import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";

import { LocalStorage } from "../services/cache/LocalStorage.service";
import { api } from "../services/api/url.api";

function Landing() {
	const [url, setUrl] = useState({ originURL: "", shortId: "" });

	const [err, setErr] = useState({ status: { link: false, shortId: false } });

	const [lastUrls, setLastUrls] = useState(
		JSON.parse(LocalStorage.get("last-urls") || "[]")
	);

	console.log(lastUrls);

	useEffect(() => {
		// console.log(new Date().getTime() > +LocalStorage.get("expire"));
		// console.log(new Date().getTime(), +LocalStorage.get("expire"));
	}, []);

	const handleSubmit = (e) => {
		let { originURL, shortId } = url;

		if (!originURL.match(/\bhttps?:\/\//)) {
			setErr({
				status: { ...err.status, link: true },
				message: "Insira o HTTP(S)",
			});
		} else {
			api.create(originURL, shortId)
				.then((res) => {
					delete res.data._id;
					setLastUrls((prevent) => [res.data, ...prevent]);
					LocalStorage.set(
						"last-urls",
						JSON.stringify([res.data, ...lastUrls])
					);
				})
				.catch((error) =>
					setErr({
						status: { ...err.status, shortId: true },
						message: error.response.data.message,
					})
				);
		}
		e.preventDefault();
	};

	return (
		<div className='min-h-screen overflow-x-hidden'>
			<div className='relative container mx-auto max-md:px-6 px-4 my-8 md:my-16 md:flex gap-16'>
				<div className='basis-3/5 w-full'>
					<div className='space-y-2'>
						<h1 className='text-6xl font-semibold bg-gradient-to-r base-gradient text-transparent bg-clip-text'>
							Shorten URL
						</h1>
						<hr className='bg-gradient-to-r base-gradient h-0.5' />
						<p className='text-xl dark:text-slate-400'>
							Deixe seu url mais curto e memorável!
						</p>
					</div>
					<form onSubmit={handleSubmit} className='my-4 space-y-3'>
						<label
							htmlFor='origin-url'
							className='relative w-full flex items-center'
						>
							<input
								type='text'
								id='origin-url'
								className={`box-content w-full py-2 pl-2 pr-[148px] !outline-none bg-slate-100 ${
									err.status.link ? "ring-2 ring-red-400" : ""
								}`}
								placeholder='URL original: https://origin.url/veeery/long/link'
								value={url.originURL}
								onChange={(e) => {
									setUrl((prevent) => {
										return {
											...prevent,
											originURL: e.target.value,
										};
									});
									setErr({
										...err,
										status: { ...err.status, link: false },
									});
									e.target.classList.remove("invalid:ring-2");
									e.target.classList.remove(
										"invalid:ring-red-500"
									);
								}}
								// onInvalid={e => {
								// 	e.target.classList.add('invalid:ring-2')
								// 	e.target.classList.add('invalid:ring-red-500')
								// }}
								required
							/>
							<button
								type='submit'
								className={`h-full aspect-square absolute right-0 duration-300 bg-[#7A8FD3] hover:bg-[#45CDE9] flex gap-2.5 items-center whitespace-nowrap text-white px-2.5 ${
									err.status.link
										? "ring-2 ring-[#7A8FD3] hover:ring-[#45CDE9]"
										: ""
								}`}
							>
								<ArrowPathRoundedSquareIcon className='w-5 aspect-square text-white stroke-2' />{" "}
								Encurtar URL
							</button>
							{err.status.link && (
								<span className='bg-red-500 text-white absolute top-full left-0 font-thin mt-2 py-1.5 px-2 rounded-lg z-10 text-xs after:absolute after:w-2 after:aspect-square after:bg-red-500 after:rotate-45 after:-top-0.5 after:left-1'>
									{err.message}
								</span>
							)}
						</label>

						<label
							htmlFor='short-id'
							className='relative w-full flex items-center'
						>
							<input
								type='text'
								id='short-id'
								className={`w-full py-2 px-2 !outline-none bg-slate-100 ${
									err.status.shortId
										? "ring-2 ring-red-400"
										: ""
								}`}
								placeholder='Key (opcional)'
								value={url.shortId}
								onChange={(e) => {
									setUrl((prevent) => {
										return {
											...prevent,
											shortId: e.target.value,
										};
									});
									setErr({
										...err,
										status: {
											...err.status,
											shortId: false,
										},
									});
								}}
							/>
							{err.status.shortId && (
								<span className='bg-red-500 text-white absolute top-full left-0 font-thin mt-2 py-1.5 px-2 rounded-lg z-10 text-sm after:absolute after:w-2 after:aspect-square after:bg-red-500 after:rotate-45 after:-top-0.5 after:left-1'>
									{err.message}
								</span>
							)}
							{/* <button className='h-full aspect-square absolute right-0 duration-300 bg-[#7A8FD3] hover:bg-[#45CDE9] flex gap-2.5 items-center whitespace-nowrap font-thin text-white px-2.5'>
								<ArrowPathRoundedSquareIcon className='w-5 aspect-square text-white' /> Encurtar URL
							</button> */}
						</label>
					</form>
				</div>

				<div className='max-md:mt-8 h-fit sticky top-0 basis-2/5 w-full'>
					<Aside urls={lastUrls} />
				</div>
			</div>
		</div>
	);
}

const Aside = ({ urls }) => {
	return (
		<aside>
			<span className='font-semibold'>
				Suas últimas URLs publicadas aqui
			</span>
			<ul className='space-y-2 mt-2 md:mt-4 divide-y divide-dashed'>
				{urls.map((url) => (
					<li key={url.shortId}>
						<div className='flex justify-between'>
							<Link
								className='truncate max-w-[60%]'
								to={"/" + url.shortId}
							>
								<span className='max-md:hidden'>
									{window.location.origin}
								</span>
								/
								<span className='bg-gradient-to-l base-gradient text-transparent bg-clip-text font-bold'>
									{url.shortId}
								</span>
							</Link>
							<div className='space-x-3'>
								<button>COPY</button>
								<button>DEL</button>
							</div>
						</div>
						<small className='text-slate-400'>
							{url.originURL}
						</small>
					</li>
				))}
			</ul>
		</aside>
	);
};

export default Landing;
