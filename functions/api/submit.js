/**
 * POST /api/submit
 */

import turnstilePlugin from "@cloudflare/pages-plugin-turnstile";

// This is a demo secret key. In prod, we recommend you store
// your secret key(s) safely. 
const SECRET_KEY = '0x4AAAAAAAVnG2xM7Rs58xPsRah3p2OaLq0';
const AIRTABLE_BASE_ID = 'patEeDx6YuKKxOV7p';
const AIRTABLE_TABLE_NAME = 'submit.pages.dev';
const AIRTABLE_API_KEY = 'patEeDx6YuKKxOV7p.55f09ed93b1fc25c621754ec669a491d087c3905737ca46285b44fbec14453f6';

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

		return new Response(pretty, {
			headers: {
				'Content-Type': 'application/json;charset=utf-8'
			}
		});

    })

];
