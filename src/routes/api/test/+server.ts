import { json } from '@sveltejs/kit';
import { Daytona } from '@daytonaio/sdk';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
	try {
		// Initialize Daytona SDK
		const daytona = new Daytona({
			apiKey: 'your-api-key',
			apiUrl: 'https://app.daytona.io/api',
		});

		// Just try to import and instantiate - don't actually call API
		return json({ 
			status: 'success',
			message: 'Daytona SDK imported and initialized successfully',
			sdk: typeof daytona
		});
	} catch (error) {
		return json({ 
			status: 'error',
			message: error instanceof Error ? error.message : String(error)
		}, { status: 500 });
	}
}
