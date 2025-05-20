<script lang="ts">
	import { confetti } from '@neoconfetti/svelte';
	import { MediaQuery } from 'svelte/reactivity';
	import HintModal from './HintModal.svelte'; // Import the modal

	// Generate a random Fahrenheit value between -30 and 120 (typical weather range)
	function randomFahrenheit() {
		return Math.floor(Math.random() * (120 - (-30) + 1)) - 30;
	}

	let fahrenheit = randomFahrenheit();
	let userCelsius = '';
	let result: 'win' | 'lose' | null = null;
	let showResult = false;
	let score = 0;
	let wrong = 0;
	let gameOver = false;
	let gameWon = false;
	let easyMode = false;
	let difficultyLocked = false;
	let showHintModal = false; // Variable to control modal visibility
	const reducedMotion = new MediaQuery('(prefers-reduced-motion: reduce)');

	function toggleHintModal() {
		showHintModal = !showHintModal;
	}

	function setEasyMode(val: boolean) {
		console.log('setEasyMode', val);
		if (score === 0 && wrong === 0 && !gameOver && !showResult) {
			easyMode = val;
		}
	}

	function checkAnswer() {
		difficultyLocked = true;
		const correctCelsius = (fahrenheit - 32) * 5 / 9;
		const guess = Number(userCelsius);
		const tolerance = easyMode ? 5 : 1;
		if (!isNaN(guess) && Math.abs(guess - correctCelsius) <= tolerance) {
			score += 1;
			result = 'win';
		} else {
			wrong += 1;
			result = 'lose';
		}
		showResult = true;
		if (score >= 5) {
			gameOver = true;
			gameWon = true;
		}
		if (wrong >= 3) {
			gameOver = true;
			gameWon = false;
		}
	}

	function nextRound() {
		fahrenheit = randomFahrenheit();
		userCelsius = '';
		result = null;
		showResult = false;
	}

	function restart() {
		fahrenheit = randomFahrenheit();
		userCelsius = '';
		result = null;
		showResult = false;
		score = 0;
		wrong = 0;
		gameOver = false;
		gameWon = false;
		easyMode = false;
		difficultyLocked = false;
	}
</script>

<svelte:head>
	<title>Fahrenheit Guessing Game</title>
	<meta name="description" content="Guess the Celsius value for a given Fahrenheit temperature!" />
</svelte:head>

<h1 class="visually-hidden">Fahrenheit Guessing Game</h1>

<button type="button" class="hint-button" on:click={toggleHintModal}>Show Hints</button>

<form on:submit|preventDefault={checkAnswer} class="game-form">
	<div class="difficulty-toggle">
		<label>
			<input type="checkbox" bind:checked={easyMode} disabled={difficultyLocked || score > 0 || wrong > 0 || showResult} />
			Easy mode (±5°C)
		</label>
		<span class="difficulty-label">{easyMode ? 'Easy' : 'Hard'} mode</span>
	</div>
	<div class="scoreboard">
		<p>Score: {score} / 5</p>
		<p>Wrong: {wrong} / 3</p>
	</div>
	<div class="grid playing">
		<div class="row current">
			<div class="letter exact">{fahrenheit}°F</div>
			<div class="letter">
				<input
					type="number"
					bind:value={userCelsius}
					placeholder="?°C"
					class="celsius-input"
					aria-label="Enter Celsius value"
					disabled={showResult || gameOver}
				/>
			</div>
		</div>
	</div>
	<div class="controls">
		{#if gameOver}
			{#if gameWon}
				<p class="result win">You won the game! 🎉</p>
				<button type="button" class="restart selected" on:click={restart}>Play again?</button>
			{:else}
				<p class="result lose">Game over! You got 3 wrong. Try again?</p>
				<button type="button" class="restart selected" on:click={restart}>Restart</button>
			{/if}
		{:else if showResult}
			{#if result === 'win'}
				<p class="result win">Correct!</p>
				{#if easyMode}
					<p class="result">The exact answer was {((fahrenheit - 32) * 5 / 9).toFixed(2)}°C.</p>
				{/if}
				<button type="button" class="restart selected" on:click={nextRound}>Next</button>
			{:else}
				<p class="result lose">Not quite! The correct answer was {((fahrenheit - 32) * 5 / 9).toFixed(2)}°C.</p>
				<button type="button" class="restart selected" on:click={nextRound}>Next</button>
			{/if}
		{:else}
			<button type="submit" class="submit selected">Check</button>
		{/if}
	</div>
</form>
{#if gameOver && gameWon}
	<div
		style="position: absolute; left: 50%; top: 30%"
		use:confetti={{
			particleCount: reducedMotion.current ? 0 : undefined,
			force: 0.7,
			stageWidth: window.innerWidth,
			stageHeight: window.innerHeight,
			colors: ['#ff3e00', '#40b3ff', '#676778']
		}}
	></div>
{/if}

<HintModal bind:showModal={showHintModal} on:close={() => showHintModal = false} />

<style>
	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
	.game-form {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
	}
	.difficulty-toggle {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1rem;
	}
	.difficulty-label {
		font-size: 1rem;
		font-weight: 500;
		color: #666;
	}
	.scoreboard {
		display: flex;
		gap: 2rem;
		justify-content: center;
		margin-bottom: 1rem;
		font-size: 1.1rem;
		font-weight: 500;
	}
	.grid {
		--width: min(100vw, 40vh, 380px);
		max-width: var(--width);
		align-self: center;
		justify-self: center;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}
	.grid .row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 0.2rem;
		margin: 0 0 0.2rem 0;
	}
	.letter {
		aspect-ratio: 1;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		box-sizing: border-box;
		border: none;
		font-size: calc(0.08 * var(--width));
		border-radius: 2px;
		background: white;
		margin: 0;
		color: rgba(0, 0, 0, 0.7);
	}
	.letter.exact {
		background: var(--color-theme-2);
		color: white;
	}
	.celsius-input {
		width: 80%;
		font-size: 1.2rem;
		padding: 0.5rem 1rem;
		border: 1px solid #ccc;
		border-radius: 0.5rem;
		text-align: center;
	}
	.controls {
		text-align: center;
		justify-content: center;
		height: min(18vh, 10rem);
	}
	.result {
		font-size: 1.3rem;
		margin-top: 0.5rem;
	}
	.result.win {
		color: var(--color-theme-2);
		font-weight: bold;
	}
	.result.lose {
		color: #c00;
		font-weight: bold;
	}
	.restart, .submit {
		width: 100%;
		padding: 1rem;
		background: rgba(255, 255, 255, 0.5);
		border-radius: 2px;
		border: none;
		font-size: 1.1rem;
		margin-top: 1rem;
	}
	.restart:focus, .restart:hover, .submit:focus, .submit:hover {
		background: var(--color-theme-1);
		color: white;
		outline: none;
	}
	.hint-button {
		background-color: var(--color-theme-2, #40b3ff);
		color: white;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 4px;
		cursor: pointer;
		font-size: 0.9rem;
		margin-bottom: 1rem; /* Add some space below the button */
		align-self: center; /* Center the button if the parent is a flex container */
	}

	.hint-button:hover {
		background-color: var(--color-theme-1, #ff3e00);
	}
</style>
