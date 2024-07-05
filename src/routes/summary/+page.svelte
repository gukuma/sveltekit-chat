<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { review } from '../store'; // Import the review store

    let showModal = false;
    let consentGiven = false;
    let reviews = null;

    onMount(() => {
        review.subscribe(value => {
            reviews = value;
            if (reviews && Object.keys(reviews).length > 0) {
                consentGiven = true;
            }
        });
    });

    const handleButtonClick = () => {
        if (!consentGiven) {
            showModal = true;
        } else {
            goto('/intakeform');
        }
    };

    const handleConsent = () => {
        consentGiven = true;
        showModal = false;
    };
</script>

<div class="flex items-center justify-center min-h-screen">
    <div class="w-full max-w-2xl p-4 text-center">
        <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Thank you for your participation!
        </h1>
        <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
We appreciate it. By clicking the button below, you will be asked to fill in a short survey about your experience, and then be redirected back to Prolific to collect your payment.        </p>
        {#if reviews}
            <div class="my-4">
                <h2 class="text-2xl font-bold">Your Reviews:</h2>
                <ul class="text-left text-lg text-gray-700 dark:text-gray-300">
                    {#each Object.entries(reviews) as [key, value]}
                        <li><strong>{key}:</strong> {value}</li>
                    {/each}
                </ul>
            </div>
        {/if}
        <button on:click={handleButtonClick} class="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Return to Prolific</button>
    </div>
</div>

