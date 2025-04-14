<script lang="ts">
	import Bar from "../components/bar.svelte";
    import Announcements from "../components/announcements.svelte";
    import HighlightedUrLs from "../components/HighlightedURLs.svelte";
</script>
    
<div class="flex flex-col space-x-5 space-y-6 w-screen ">
    <Bar />

    <h1 class="flex justify-center text-6xl">Serca: AI-powered media search engine</h1>
    <p class="flex justify-center">We still building this. I'm not a web dev so please bare with me...</p>

    <h1 class="flex justify-center text-4xl">What is Serca?</h1>
    <p class="flex justify-center">Serca is a media search engine. We allow you to search our database of crawled media by description instead of randomly searching hoping you find the video your looking for.
        Unless you want to... we won't stop you. But we wanna make this better for you.
    </p>
    
    
    <!-- <label for="query" class="flex justify-center mb-2 text-sm font-medium text-gray-900 dark:text-white">Search Query</label>
    <div class="flex justify-center w-50%">
        <div class="flex-row space-x-4">
            <input type="text" id="query"
    class="w-48 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    placeholder="Something semi coherent" required />
            <button class="">Search</button>
        </div>
    </div> -->

    <h1 class="flex justify-center text-gray-900">Announcements</h1>
    <Announcements />

    <h1 class="flex justify-center text-gray-600">Highlighted sites</h1>
    <HighlightedUrLs />
</div>