<script>
   
    import { formData, summary } from '../store';
    import { goto } from '$app/navigation';

    let age = '';
    let gender = '';
    let background = '';
    let demographics = '';
    let positiveExperience = '';
    let negativeExperience = '';

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = { age, gender, background, demographics, positiveExperience, negativeExperience };
        formData.update(currentData => [...currentData, data]);

        const summaryText = `Age: ${age}, Gender: ${gender}, Background: ${background}, Demographics: ${demographics}, Positive Park Experience: ${positiveExperience}, Negative Park Experience: ${negativeExperience}`;
        summary.set(summaryText);

        // Save data to localStorage
        localStorage.setItem('formData', JSON.stringify(data));
        localStorage.setItem('summary', summaryText);

        // Navigate to /persona subpage
        goto('/persona');
    };
</script>


<div class="grid grid-cols-2 min-h-screen gap-4 p-4 ">

    <div class=" flex flex-col w-full">

      
        <h2 class="text-4xl font-extrabold dark:text-white mb-6 ">Instructions</h2>
        
        <p class="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">
            Please provide your details as accurately as you are comfortable with; you can be as specific or as vague as you wish. Your privacy and comfort are our top priorities, and you are free to skip any questions or provide less detail if it makes you more comfortable. The information you provide will be used solely to animate a digital persona for this study. While accuracy helps create a more realistic persona, your comfort and privacy are paramount. 
        </p>
        
            <p class="my-4 text-lg text-gray-500">
               If you have any questions or need assistance, please contact our support team at [support email/phone number]. Thank you for participating in our study!
            </p>
            
        
            </div>

<div class="flex  justify-start min-h-screen">
    <div class="w-full max-w-2xl p-4 text-left">
        <form on:submit={handleSubmit}>
            <div class="mb-6">
                <label for="age" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">What is your age?</label>
                <input type="number" id="age" bind:value={age} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your age" />
            </div>
            <div class="mb-6">
                <label for="gender" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">What is your gender?</label>
                <input type="text" id="gender" bind:value={gender} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your gender" />
            </div>
            <div class="mb-6">
                <label for="background" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Please describe your background (e.g., occupation, education, etc.).</label>
                <textarea id="background" bind:value={background} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="E.g., Software Engineer, College Graduate, etc."></textarea>
            </div>
            <div class="mb-6">
                <label for="demographics" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Please provide your demographic information (e.g., income level, household size, etc.).</label>
                <textarea id="demographics" bind:value={demographics} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="E.g., $50,000/year, family of 4, etc."></textarea>
            </div>
            <div class="mb-6">
                <label for="positiveExperience" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Describe a positive experience you have had in a park.</label>
                <textarea id="positiveExperience" bind:value={positiveExperience} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="E.g., a relaxing picnic, a fun family gathering, etc."></textarea>
            </div>
            <div class="mb-6">
                <label for="negativeExperience" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Describe a negative experience you have had in a park.</label>
                <textarea id="negativeExperience" bind:value={negativeExperience} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="E.g., lack of facilities, safety concerns, etc."></textarea>
            </div>
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
    </div>
</div>

    <!-- Right Half -->
   
</div>