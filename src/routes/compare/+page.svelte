<script>
    import { opinions, review } from '../store';
    import { writable } from 'svelte/store';
    import { goto } from '$app/navigation';

    let currentOpinionKey = null;
    let currentOpinionValue = '';
    let sliderValue = null;
    let responses = writable({});
    let opinionsObject = {};
    let opinionKeys = [];

    let questions = {
        cleanliness: "What standards of cleanliness do you expect from public toilets, and how often do you think they should be cleaned?",
        gender: "Do you prefer gender-specific or unisex toilets, and why?",
        impact: "How do you think the redesign of the park's toilet facilities could positively impact the local community?",
        aesthetics: "How important is the aesthetic appearance of the toilet facilities to you? Do you have any specific design preferences or suggestions?",
        additionals: "Are there any additional amenities (e.g., baby changing stations, hand sanitizers, mirrors) that you believe should be included in the redesigned toilets?",
    };
    let questionKeys = Object.keys(questions);

    const descriptions = {
        1: "A: I and my Persona are separate.",
        2: "B: I and my Persona are barely aligned.",
        3: "C: I and my Persona are somewhat aligned.",
        4: "D: I and my Persona are closely aligned.",
        5: "E: I and my Persona are almost the same."
    };

    opinions.subscribe(value => {
        if (value) {
            opinionsObject = value;
            opinionKeys = Object.keys(opinionsObject);
            if (opinionKeys.length > 0) {
                currentOpinionKey = opinionKeys[0];
                currentOpinionValue = opinionsObject[currentOpinionKey];
            }
        }
    });

    function handleSliderChange(event) {
        sliderValue = +event.target.value;
    }

    function saveResponseAndNext() {
        if (sliderValue !== null) {
            responses.update(current => ({
                ...current,
                [currentOpinionKey]: sliderValue
            }));

            review.update(current => ({
                ...current,
                [currentOpinionKey]: sliderValue
            }));

            let currentIndex = opinionKeys.indexOf(currentOpinionKey);
            if (currentIndex < opinionKeys.length - 1) {
                currentOpinionKey = opinionKeys[currentIndex + 1];
                currentOpinionValue = opinionsObject[currentOpinionKey];
                sliderValue = null;
            } else {
                goto('/summary');
            }
        }
    }
</script>

<style>
    .slider-icons {
        display: flex;
        justify-content: space-between;
        position: relative;
    }

    .slider-icons span {
        position: absolute;
        bottom: -2rem;
    }

    .toast {
        opacity: 0;
        animation: fadeIn 0.5s forwards;
    }

    @keyframes fadeIn {
        to {
            opacity: 1;
        }
    }
</style>

<div class="container mx-auto p-4 flex flex-col items-center">
    <div class="mb-4">
        <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-100">
            <strong>{questions[questionKeys[opinionKeys.indexOf(currentOpinionKey)]]}</strong>
        </p>
    </div>
    {#if opinionKeys.length > 0}
        <div class="flex flex-wrap justify-center gap-10 mb-10">
            <div class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Opinion on:</h5>
                <p class="font-normal text-gray-700 dark:text-gray-400">{ currentOpinionKey }</p>
                <p class="font-normal text-gray-700 dark:text-gray-400">{ currentOpinionValue }</p>
            </div>
        </div>
        <div class="w-full max-w-lg mb-10">
            <div class="relative mb-6">
                <label for="labels-range-input" class="sr-only">Labels range</label>
                <input id="labels-range-input" type="range" min="1" max="5" value={sliderValue} class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" on:change={handleSliderChange} />
                <div class="slider-icons">
                    <span class="text-sm text-gray-500 dark:text-gray-400">A</span>
                    <span class="text-sm text-gray-500 dark:text-gray-400">B</span>
                    <span class="text-sm text-gray-500 dark:text-gray-400">C</span>
                    <span class="text-sm text-gray-500 dark:text-gray-400">D</span>
                    <span class="text-sm text-gray-500 dark:text-gray-400">E</span>
                </div>
            </div>
            <button class="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:bg-gray-400" on:click={saveResponseAndNext} disabled={sliderValue === null}>
                Confirm and Next
            </button>
            {#if sliderValue !== null}
                <div id="toast-default" class="toast flex items-center w-full max-w-xs p-4 mt-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
                        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z"/>
                        </svg>
                        <span class="sr-only">Fire icon</span>
                    </div>
                    <div class="ms-3 text-sm font-normal">{descriptions[sliderValue]}</div>
                </div>
            {/if}
        </div>
    {:else}
        <p>No opinions to display.</p>
    {/if}
</div>
