<script lang="ts">
	let testResult = 'Click a button to run a test';
	let isLoading = false;
	let currentTest = '';

	async function runTest(endpoint: string, testName: string) {
		isLoading = true;
		currentTest = testName;
		testResult = `Running ${testName}...`;

		try {
			const startTime = Date.now();
			const response = await fetch(endpoint);
			const data = await response.json();
			const duration = Date.now() - startTime;
			
			testResult = `✅ ${testName} completed in ${duration}ms\n\n${JSON.stringify(data, null, 2)}`;
		} catch (error) {
			testResult = `❌ ${testName} failed\n\nError: ${error instanceof Error ? error.message : String(error)}`;
		} finally {
			isLoading = false;
			currentTest = '';
		}
	}
</script>

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
		font-family: system-ui, -apple-system, sans-serif;
	}

	h1 {
		color: #333;
		border-bottom: 3px solid #ff6b35;
		padding-bottom: 0.5rem;
	}

	.description {
		color: #666;
		margin-bottom: 2rem;
	}

	.test-buttons {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		margin-bottom: 2rem;
	}

	button {
		padding: 0.75rem 1.5rem;
		font-size: 1rem;
		border: 2px solid #ff6b35;
		background: white;
		color: #ff6b35;
		cursor: pointer;
		border-radius: 8px;
		transition: all 0.2s;
		font-weight: 600;
	}

	button:hover:not(:disabled) {
		background: #ff6b35;
		color: white;
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(255, 107, 53, 0.3);
	}

	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.result-container {
		background: #f5f5f5;
		border-radius: 8px;
		padding: 1.5rem;
		margin-top: 2rem;
	}

	.result-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	h2 {
		margin: 0;
		color: #333;
	}

	.status-badge {
		padding: 0.25rem 0.75rem;
		border-radius: 12px;
		font-size: 0.875rem;
		font-weight: 600;
	}

	.status-loading {
		background: #ffd93d;
		color: #333;
	}

	.status-ready {
		background: #6bcf7f;
		color: white;
	}

	pre {
		background: white;
		padding: 1rem;
		border-radius: 4px;
		overflow-x: auto;
		border-left: 4px solid #ff6b35;
		white-space: pre-wrap;
		word-wrap: break-word;
	}

	.info-box {
		background: #e3f2fd;
		border-left: 4px solid #2196f3;
		padding: 1rem;
		margin-bottom: 2rem;
		border-radius: 4px;
	}

	.info-box strong {
		color: #1976d2;
	}
</style>

<div class="container">
	<h1>Cloudflare Workers + Daytona SDK Test</h1>
	<p class="description">Testing if the Daytona SDK can be bundled for Cloudflare Workers</p>

	<div class="info-box">
		<strong>Build Status:</strong> ✅ All tests built successfully with @sveltejs/adapter-cloudflare
		<br />
		<strong>SDK Version:</strong> @daytonaio/sdk@0.130.0
	</div>

	<h3>Test Scenarios:</h3>
	<div class="test-buttons">
		<button 
			on:click={() => runTest('/api/test', 'Basic SDK Import')}
			disabled={isLoading}
		>
			🔧 Basic Import Test
		</button>

		<button 
			on:click={() => runTest('/api/exec-test', 'Full SDK Execution')}
			disabled={isLoading}
		>
			🚀 Full Exec Test
		</button>
	</div>

	<div class="result-container">
		<div class="result-header">
			<h2>Test Result:</h2>
			{#if isLoading}
				<span class="status-badge status-loading">⏳ Running {currentTest}...</span>
			{:else}
				<span class="status-badge status-ready">Ready</span>
			{/if}
		</div>
		<pre>{testResult}</pre>
	</div>

	<details style="margin-top: 2rem;">
		<summary style="cursor: pointer; font-weight: 600; color: #666;">
			📚 What do these tests do?
		</summary>
		<div style="padding: 1rem; background: #f9f9f9; margin-top: 0.5rem; border-radius: 4px;">
			<h4>🔧 Basic Import Test</h4>
			<p>Tests simple SDK import and initialization. Verifies that the SDK can be imported without pulling in Node.js modules.</p>
			
			<h4>🚀 Full Exec Test</h4>
			<p>Tests comprehensive SDK usage including:</p>
			<ul>
				<li>Creating a sandbox with custom Image (Image.base().runCommands())</li>
				<li>Executing shell commands</li>
				<li>Running code execution</li>
				<li>Cleaning up resources</li>
			</ul>
			<p><em>Note: This test will attempt to make actual API calls if valid credentials are provided.</em></p>
		</div>
	</details>
</div>
