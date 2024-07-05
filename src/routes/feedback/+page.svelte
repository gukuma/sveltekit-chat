<script>
    import { onMount } from 'svelte';
    import { selectedPersona } from '../store';
    import { goto } from '$app/navigation';
    
    let personaData = {};
    let sliderValue = 0;

    onMount(() => {
        selectedPersona.subscribe(value => {
            personaData = value;
        });
    });

    const handleBack = () => {
        console.log('Current Persona Data:', personaData); // Output current persona data to console
        goto('/persona');
    };

    const handleNext = () => {
        console.log('Current Persona Data:', personaData); // Output current persona data to console
        goto('/opinion');
    };

    const descriptions = {
        0: "Not at all.",
        1: "I and my Persona are separate.",
        2: "I and my Persona are barely aligned.",
        3: "I and my Persona are somewhat aligned.",
        4: "I and my Persona are closely aligned.",
        5: "I and my Persona are almost the same.",
        6: "Almost there.",
        7: "Exactly the same."
    };

    function handleSliderChange(event) {
        sliderValue = +event.target.value;
        showToast(descriptions[sliderValue]);
    }

    let toastMessage = '';

    function showToast(message) {
        toastMessage = message;
        setTimeout(() => {
            toastMessage = '';
        }, 20000);
    }
</script>

<div class="flex items-center justify-center min-h-screen">
    <div class="w-full max-w-3xl p-4 rounded-lg shadow-md text-center">
        <div class="mb-4">
            {#each Object.keys(personaData) as key}
                <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                    <strong>{personaData[key]}</strong>
                </p>
            {/each}
        </div>
        
        <div class="mb-4">
            <label for="slider" class="block mb-2 text-3xl font-medium text-gray-900 dark:text-white">
                How closely do you identify with the persona you created?</label>
            <input type="range" id="slider" min="0" max="7" bind:value={sliderValue} on:input={handleSliderChange} class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
            <div class="flex justify-between mt-2">
                <span class="text-xl font-medium text-gray-900 dark:text-white">0</span>
                <span class="text-xl font-medium text-gray-900 dark:text-white">7</span>
            </div>
            <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 mt-2">
                Slider Value: {sliderValue}
            </p>
        </div>
        <button on:click={handleNext} class="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Next</button>
    </div>
</div>

{#if toastMessage}
    <div id="toast-default" class="fixed bottom-4 right-4 flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
        <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z"/>
            </svg>
            <span class="sr-only">Info icon</span>
        </div>
        <div class="ml-3 text-sm font-normal">{toastMessage}</div>
    </div>
{/if}
