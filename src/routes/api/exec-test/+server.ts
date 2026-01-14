import { json } from '@sveltejs/kit';
import { Daytona, Image } from '@daytonaio/sdk';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	try {
		// Initialize Daytona SDK with environment variables or test config
		const daytona = new Daytona({
			apiKey: 'your-api-key',
			apiUrl: 'https://app.daytona.io/api',
		});

		console.log('Creating sandbox with custom image...');
		
		// Create a sandbox with a custom Image (like the exec-command example)
		const sandbox = await daytona.create(
			{
				language: 'typescript',
			}
		);

		console.log('Sandbox created:', sandbox.id);

		// Run a simple command
		const cmdResult = await sandbox.process.executeCommand('echo "Hello from Cloudflare Workers!"');
		
		// Run some code
		const codeResult = await sandbox.process.codeRun('console.log("Hello from code execution!")');

		// Cleanup
		await daytona.delete(sandbox);

		return json({
			status: 'success',
			sandboxId: sandbox.id,
			commandResult: cmdResult.result,
			codeResult: codeResult.result,
			message: 'Full SDK test completed successfully!'
		});
	} catch (error) {
		console.error('Error:', error);
		return json({
			status: 'error',
			message: error instanceof Error ? error.message : String(error),
			stack: error instanceof Error ? error.stack : undefined
		}, { status: 500 });
	}
};
