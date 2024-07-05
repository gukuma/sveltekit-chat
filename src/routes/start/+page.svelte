<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';

    let showModal = false;
    let consentGiven = false;

    const handleButtonClick = () => {
        if (!consentGiven) {
            showModal = true;
        } else {
            window.open('/intakeform', '_blank');
        }
    };

    const handleConsent = () => {
        consentGiven = true;
        showModal = false;
    };
</script>

<div class="flex items-center justify-center min-h-screen">
    <div class="w-1/2 p-4 text-left">
        <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-blue-600 dark:text-blue-500 md:text-5xl lg:text-6xl ">
Welcome!        </h1>
        <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            Today, you'll be engaging in a creative exercise designed to help us better leverage AI for understanding users. 
            Your input is invaluable, and we look forward to seeing how you interact with the materials provided. 
        </p>
        <dl class="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700 my-6">
            <div class="flex flex-col pb-3">
                <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Step 1: Read Design Brief</dt>
                <dd class="text-lg font-semibold">
                    Please read the provided <span class="underline underline-offset-3 decoration-4 decoration-blue-400 dark:decoration-blue-600">Design Brief</span> carefully. It sets the context for the task.
                </dd>
            </div>
            <div class="flex flex-col py-3">
                <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Step 2: Generate a persona of yourself</dt>
                <dd class="text-lg font-semibold">
                    Fill in personal details you are comfortable sharing in order to generate a 
                    persona.
                    A persona is a fictional character that represents a specific group of users. 
                    It helps designers understand user needs.
                </dd>
            </div>
            <div class="flex flex-col pt-3">
                <dt class="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Step 3: Evaluate persona</dt>
                <dd class="text-lg font-semibold">
                    Evaluate how accurately the persona represents you by rating its details and responses.
                </dd>
            </div>
        </dl>
    </div>

    <div class="w-1/2 p-4">
        <div class="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800" id="defaultTab" data-tabs-toggle="#defaultTabContent" role="tablist">
                <li class="me-2">
                    <button id="about-tab" data-tabs-target="#about" type="button" role="tab" aria-controls="about" aria-selected="true" class="inline-block p-4 text-blue-600 rounded-ss-lg  dark:bg-gray-800  dark:text-blue-500">
                        Design Brief</button>
                </li>
            </ul>
            <div id="defaultTabContent">
                <div class="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800 text-left" id="about" role="tabpanel" aria-labelledby="about-tab">
                    <h2 class="mb-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        The Rotterdam Municipal Government Seeks Proposals for New Public Toilet Facilities
                    </h2>
                    <p class="mb-3 text-gray-500 dark:text-gray-400">
                        The municipality of Rotterdam is launching a project to revamp, restore or replace the public toilets within Euromast park, a popular and vibrant outdoor space in the city. Public toilets are essential community infrastructure, especially in a park like this, where many people engage in outdoor activities. Well-located and functional public toilets enhance the amenity of public parks, promote walking and passive recreation, support organised sport participation, and generally encourage people to be physically active in their community. We are committed to ensuring that the project reflects the broad needs and perspectives of the community.
                    </p>
                </div>
            </div>
        </div>
        <button on:click={handleButtonClick} class="my-4 px-4 py-2 bg-blue-600 text-white text-2xl rounded">Get Started in New Tab</button>
    </div>
</div>
{#if showModal}
    <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
        <div class="bg-white rounded p-8">
            <h2 class="text-xl font-bold mb-4">Informed Consent</h2>
            <p class="mb-4">Please read and agree to the terms of the study to proceed.</p>
            <!-- Add your terms and conditions here -->
            <div class="flex justify-end items-center">
                <label class="flex items-center mr-4">
                    <input type="checkbox" class="form-checkbox mr-2" id="consentToggle">
                    <span>I Understand that by clicking this, I am giving my consent.</span>
                </label>
                <button on:click={() => showModal = false} class="mr-4 px-4 py-2 bg-gray-300 rounded">Cancel</button>
                <button on:click={handleConsent} class="px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
            </div>
        </div>
    </div>
{/if}
