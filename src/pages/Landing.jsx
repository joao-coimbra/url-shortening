import { useEffect } from 'react';

import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline';

import { LocalStorage } from '../services/cache/LocalStorage.service';

function Landing() {

    useEffect(() => {
        console.log((new Date()).getTime() > +LocalStorage.get('expire'))
        console.log((new Date()).getTime(), +LocalStorage.get('expire'))
    }, [])

	return (
		<div className='w-screen min-h-screen dark:bg-slate-800 overflow-x-hidden'>
			<div className='container mx-auto px-4 my-16 flex gap-8'>
				<div className="basis-3/5">
					<div className='space-y-2'>
						<h1 className='text-6xl dark:text-white font-semibold'>
							Abre.ai
						</h1>
						<p className='text-xl dark:text-slate-400'>
							Deixe seu url mais curto e memorável!
						</p>
					</div>
					<div className='my-4 w-3/5'>
						<label htmlFor='origin-url' className="relative w-full flex items-center">
							<input
								type='text'
								id='origin-url'
								className='w-full py-1 px-2'
                                placeholder="https://"
							/>
                            <button className="h-full aspect-square absolute right-0 duration-300 bg-fuchsia-800 hover:bg-fuchsia-700 grid place-items-center">
                            <ArrowPathRoundedSquareIcon className='w-5 aspect-square text-white' />
                            </button>
						</label>
					</div>

                    <button onClick={() => {LocalStorage.set('expire', (new Date()).getTime() + 60000)}}>asdasddasd</button>
				</div>

				<aside className='sticky top-0'>asdasd</aside>
			</div>
		</div>
	);
}

export default Landing;
