/**
 * POST /api/submit
 */

import turnstilePlugin from "@cloudflare/pages-plugin-turnstile";

// This is a demo secret key. In prod, we recommend you store
// your secret key(s) safely. 
const SECRET_KEY = '0x4AAAAAAAWkJV3tbASTeSQlJ7VXRJKP4v4';

export const onRequestPost = [
    turnstilePlugin({
    	secret: SECRET_KEY,
    }),
    (async (context) => {
    	// Request has been validated as coming from a human
    	const formData = await context.request.formData()

    	var tmp, outcome = {};
		for (let [key, value] of formData) {
			tmp = outcome[key];
			if (tmp === undefined) {
				outcome[key] = value;
			} else {
				outcome[key] = [].concat(tmp, value);
			}
		}

		let pretty = JSON.stringify(outcome, null, 2);
		const task = await context.env.TURNSTILE.put("turnstile1", pretty);

		return new Response(task);

    })

];
