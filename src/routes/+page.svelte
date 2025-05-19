<script lang="ts">
	let celsius = '';
	$: fahrenheit = celsius !== '' && !isNaN(Number(celsius)) ? (Number(celsius) * 9/5 + 32).toFixed(2) : '';
</script>

<svelte:head>
	<title>Celsius to Fahrenheit Converter</title>
	<meta name="description" content="Convert Celsius to Fahrenheit easily." />
</svelte:head>

<section>
	<h1>Celsius to Fahrenheit Converter</h1>
	<div class="converter">
		<label for="celsius">Celsius (°C):</label>
		<input id="celsius" type="number" bind:value={celsius} placeholder="Enter °C" />
		{#if fahrenheit !== ''}
			<p class="result">Fahrenheit (°F): <strong>{fahrenheit}</strong></p>
		{/if}
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		margin-bottom: 1rem;
	}

	.converter {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		background: #f8f8f8;
		padding: 2rem 2.5rem;
		border-radius: 1rem;
		box-shadow: 0 2px 8px rgba(0,0,0,0.05);
	}

	label {
		font-size: 1.1rem;
	}

	input[type="number"] {
		padding: 0.5rem 1rem;
		font-size: 1.2rem;
		border: 1px solid #ccc;
		border-radius: 0.5rem;
		width: 10em;
	}

	.result {
		font-size: 1.3rem;
		margin-top: 0.5rem;
	}
</style>
