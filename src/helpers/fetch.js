
export const fetchSinToken = ( urlPath, data, method = 'GET') => {

    const url = urlPath;

    if ( method === 'GET' ) {
        return fetch( url );
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify( data )
        })
		.then(resp => resp.json())
		.then(data => {
				return data
		});
    }
}





