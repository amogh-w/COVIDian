export default async function Interceptor(
    endpoint,
    method = 'GET',
    body = {},
    contentType = 'application/json',
) {
    
    const hostName = 'http://localhost:4000';

    // console.log(body);
    body = contentType==='application/json'?JSON.stringify(body):body;

    let token = localStorage.getItem('token');
    token = JSON.parse(token)
    let reqOptions = {
        method,
        headers: {
            'Content-Type': contentType,
            'Authorization': `Bearer ${token}`,
        },
        body,
    };

    // delete user Auth header if userData is not present
    if (!token) {
        delete reqOptions.headers.Authorization;
    }

    // delete data body if body is not supplied
    if (contentType !== 'application/json') {
        delete reqOptions.headers['Content-Type'];
    }

    if ((!Object.keys(body).length && contentType==='application/json') || method.toLowerCase()==='get') {
        delete reqOptions.body;
    }

    // console.log(reqOptions)
    try {
        const response = await fetch(`${hostName}/${endpoint}`, reqOptions).then(
        async res => {
            if(endpoint.includes('uploads')){
                let resp = await res.blob()
                return resp
            }
            else{
                let status = res.status;
                let resp = await res.json();
                return [status, resp];
            }
        },
    );
    return response;

    } catch (error) {
        return [500,{message:"We are experincing issues please contact the technical team"}]
    }
}