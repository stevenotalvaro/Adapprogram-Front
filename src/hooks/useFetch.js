import { useEffect, useRef, useState } from 'react';

export const useFetch = ( urlPath, data, method = 'GET') => {
	const url = `${urlPath}`;

	const isMounted = useRef(true);
	const [state, setState] = useState({
		data: null,
		loading: true,
		error: null,
	});

	useEffect(() => {
		return () => {
			isMounted.current = false;
		};
	}, []);

	useEffect(() => {
		setState({
			data: null,
			loading: true,
			error: null,
		});

		if ( method === 'GET') {
			fetch(url)
				.then(resp => resp.json())
				.then(data => {
					if (isMounted.current) {
						setState({
							loading: false,
							error: null,
							data,
						});
					} else {
					}
				});
			} else {
				fetch(url, {
					method,
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
					body: JSON.stringify( data )
				})
					.then(resp => resp.json())
					.then(data => {
						if (isMounted.current) {
							setState({
								loading: false,
								error: null,
								data,
							});
						} else {
						}
					});
		}


		
	}, [url]);

	return state;
};
