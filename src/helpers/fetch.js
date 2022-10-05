
export const fetchSinToken = ( urlPath, data, method = 'GET', endpoint = '') => {

    const url = `${urlPath}/${endpoint}`;

    if ( method === 'GET' ) {
        return fetch( url );
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify( data )
        });
    }
}





