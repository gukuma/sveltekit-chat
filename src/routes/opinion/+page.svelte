<script>
    import { writable } from 'svelte/store';
    import { opinions } from '../store';
    import { goto } from '$app/navigation';

    let questions = {
        cleanliness: "What standards of cleanliness do you expect from public toilets, and how often do you think they should be cleaned?",
        gender: "Do you prefer gender-specific or unisex toilets, and why?",
        impact: "How do you think the redesign of the park's toilet facilities could positively impact the local community?",
        aesthetics: "How important is the aesthetic appearance of the toilet facilities to you? Do you have any specific design preferences or suggestions?",
        additionals: "Are there any additional amenities (e.g., baby changing stations, hand sanitizers, mirrors) that you believe should be included in the redesigned toilets?",
    };

    let responses = {};

    // Initialize responses object
    Object.keys(questions).forEach(key => {
        responses[key] = { question: questions[key], answer: '' };
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        // Update the opinions store
        opinions.set(responses);

        // Subscribe and log the current state of opinions
        opinions.subscribe(value => {
            console.log('Current Opinions Data:', value); // Output opinions data to console
        })();

        // Save data to localStorage
        localStorage.setItem('opinions', JSON.stringify(responses));

        // Navigate to /compare subpage
        goto('/compare');
    };
</script>

<div class="grid grid-cols-2 min-h-screen gap-4 p-4 justify-center">

    <div class="flex flex-col items-right justify-center w-full">
        <h2 class="text-4xl font-extrabold dark:text-white">Respond to these survey questions</h2>
        <p class="my-4 text-lg text-gray-500">
Respond to these questions regarding the design brief.    Afterwards, you will compare your responses to that of your persona's.    </p>

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

</div>
    <div class="flex items-center justify-start min-h-screen">
        <div class="w-full max-w-2xl p-4 text-left">
            <form on:submit={handleSubmit}>
                {#each Object.entries(questions) as [key, question]}
                    <div class="mb-6">
                        <label for={key} class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">{question}</label>
                        <input type="text" id={key} bind:value={responses[key].answer} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                    </div>
                {/each}
                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>
    </div>

    
</div>
