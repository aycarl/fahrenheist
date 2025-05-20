<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let showModal: boolean;

  const dispatch = createEventDispatcher();

  function closeModal() {
    dispatch('close');
  }

  // Basic Fahrenheit to Celsius conversion formula
  const formula = "°C = (°F - 32) × 5/9";

  // Common reference points
  const referencePoints = [
    { f: 32, c: 0, desc: "Freezing point of water" },
    { f: 50, c: 10, desc: "Cool day" },
    { f: 68, c: 20, desc: "Room temperature" },
    { f: 86, c: 30, desc: "Warm day" },
    { f: 104, c: 40, desc: "Very hot day" },
    { f: 212, c: 100, desc: "Boiling point of water" }
  ];
</script>

{#if showModal}
  <div class="modal-overlay" on:click={closeModal} role="presentation">
    <div class="modal-content" on:click|stopPropagation role="dialog" aria-modal="true" aria-labelledby="hint-modal-title">
      <button class="close-button" on:click={closeModal} aria-label="Close hint modal">&times;</button>
      <h2 id="hint-modal-title">Conversion Hints</h2>
      <p><strong>Formula:</strong> {formula}</p>
      <h3>Common Reference Points:</h3>
      <ul>
        {#each referencePoints as point}
          <li>{point.f}°F is {point.c}°C ({point.desc})</li>
        {/each}
      </ul>
    </div>
  </div>
{/if}

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 500px;
    position: relative;
    color: #333;
  }

  .modal-content h2 {
    margin-top: 0;
    color: var(--color-theme-1, #ff3e00);
  }
  
  .modal-content h3 {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    color: var(--color-theme-2, #40b3ff);
  }

  .modal-content ul {
    list-style: disc;
    padding-left: 1.5rem;
  }

  .modal-content li {
    margin-bottom: 0.5rem;
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 15px;
    background: none;
    border: none;
    font-size: 1.8rem;
    cursor: pointer;
    color: #888;
  }
  .close-button:hover {
    color: #333;
  }
</style>
