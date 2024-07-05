<script lang="ts">
    import { onMount } from 'svelte';
    import { readablestreamStore } from "$lib/readablestreamstore";
    import { selectedPersona } from '../store';
    import { goto } from '$app/navigation';

    const response = readablestreamStore();
    let storedData = {};
    let storedSummary = '';
    let lockStatus = {};
    let showModal = false;
    let chat_history = [];

    const checkAndProceed = () => {
        const allLocked = Object.values(lockStatus).every(status => status);
        if (allLocked) {
            selectedPersona.set(storedData);
            goto('/feedback');
        } else {
            showModal = true;
        }
    };

    onMount(() => {
        const data = localStorage.getItem('formData');
        const summaryText = localStorage.getItem('summary');
        if (data) {
            storedData = JSON.parse(data);
            Object.keys(storedData).forEach(key => {
                lockStatus[key] = false;
            });
        }
        if (summaryText) {
            storedSummary = summaryText;
        }
    });

    const toggleLock = (key) => {
        lockStatus[key] = !lockStatus[key];
    };

    async function resetSummary() {
        storedSummary = Object.keys(storedData)
            .filter(key => lockStatus[key])
            .map(key => `${key}: ${storedData[key]}`)
            .join(', ');

        if ($response.loading) return;
        
        chat_history = [...chat_history, { role: "user", content: storedSummary }];

        try {
            const answer = await response.request(
                new Request("/api/chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ chats: chat_history }),
                })
            );

            const parsedAnswer = JSON.parse(answer);
            for (const key in parsedAnswer) {
                storedData[key] = parsedAnswer[key];
            }

            chat_history = [...chat_history, { role: "assistant", content: answer }];
        } catch (err) {
            chat_history = [...chat_history, { role: "assistant", content: `Error: ${err}` }];
        }
    }
</script>

<div class="grid grid-cols-2 min-h-screen gap-4 p-4">
    <!-- Left Half -->
    <div class="p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">This is a persona representing you!</h2>
        {#each Object.keys(storedData) as key}
            <div class="mb-6">
                <div class="flex justify-between items-center mb-2">
                    <label for={key} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{key}</label>
                    <label for={`toggle-${key}`} class="flex items-center gap-2 cursor-pointer select-none text-gray-900 dark:text-white mt-2">
                        <span class="ml-3 text-sm font-medium">{lockStatus[key] ? 'Locked' : 'Lock'}</span>
                        <div class="relative">
                            <input type="checkbox" id={`toggle-${key}`} class="peer sr-only" on:click={() => toggleLock(key)} />
                            <div class="block bg-gray-300 dark:bg-gray-700 w-14 h-8 rounded-full"></div>
                            <div class="dot absolute left-1 top-1 bg-white dark:bg-gray-400 w-6 h-6 rounded-full transition peer-checked:translate-x-full peer-checked:bg-blue-500"></div>
                        </div>
                    </label>
                </div>
                <input type="text" id={key} bind:value={storedData[key]} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
        {/each}
    </div>

    <!-- Right Half -->
    <div class="flex flex-col items-left justify-center">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Locked Fields Summary</h2>
        <p class="text-gray-900 dark:text-white mb-4">{storedSummary}</p>
        <button type="button" on:click={resetSummary} class="px-4 py-2 bg-red-600 text-white rounded">Reset Summary</button>
        <button type="button" on:click={checkAndProceed} class="px-4 py-2 bg-blue-600 text-white rounded">Next</button>
    </div>
</div>

<!-- Modal -->
{#if showModal}
<div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
    <div class="bg-white p-8 rounded-lg shadow-md">
        <h2 class="text-xl font-bold mb-4">Confirmation Required</h2>
        <p class="mb-4">Please confirm all persona data before proceeding.</p>
        <button type="button" on:click={() => showModal = false} class="px-4 py-2 bg-blue-600 text-white rounded">OK</button>
    </div>
</div>
{/if}

