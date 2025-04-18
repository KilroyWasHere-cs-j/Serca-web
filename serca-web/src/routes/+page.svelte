<script lang="ts">
  import Navbar from "../components/Navbar.svelte";
  import Announcements from "../components/Announcements.svelte";
  import HighlightedSites from "../components/HighlightedSites.svelte";
  import Newsletter from "../components/Newsletter.svelte";
  import Vudoo from "../components/Vudoo.svelte";
</script>

<Navbar />

<div class="max-w-5xl mx-auto py-10 px-4 font-mono text-gray-900 bg-gradient-to-b from-gray-100 via-white to-gray-200 border-x border-gray-400 shadow-md">

  <!-- Title -->
  <h1 class="text-4xl text-center font-bold text-blue-900 mb-2">Serca: AI-Powered Media Search Engine</h1>
  <p class="italic text-center text-gray-700 mb-6">"We find what the internet forgot"</p>

  <!-- Table of Contents -->
  <div class="bg-yellow-100 border border-yellow-400 p-4 mb-10 rounded-md shadow-sm">
    <h2 class="text-xl font-bold text-teal-800 mb-2">🧭 Table of Contents</h2>
    <ul class="list-disc list-inside space-y-1 text-blue-700">
      <li><a href="#what-is-serca" class="hover:underline">What is Serca?</a></li>
      <li><a href="#how-it-works" class="hover:underline">How It Works</a></li>
      <li><a href="#sample-queries" class="hover:underline">Sample Queries</a></li>
      <li><a href="#api" class="hover:underline">Serca API</a></li>
      <li><a href="#highlighted-sites" class="hover:underline">Cool Sites</a></li>
    </ul>
  </div>

  <!-- What is Serca -->
  <section id="what-is-serca" class="mb-12">
    <h2 class="text-2xl font-bold text-purple-800 underline mb-2">What is Serca?</h2>
    <p>
      Serca is an advanced search engine powered by AI and intelligent web scraping technology. 
      It builds a comprehensive database by gathering URLs and their descriptions, enabling users to search using natural language. 
      This allows for faster, more intuitive, and accurate search results, transforming the way people find information online.
    </p>
  </section>

  <!-- How It Works -->
  <section id="how-it-works" class="mb-12">
    <h2 class="text-2xl font-bold text-purple-800 underline mb-2">How It Works</h2>
    <ul class="list-disc list-inside text-gray-800">
      <li><strong>Multimodal AI models</strong> (image, video, and audio) to analyze and process various types of media.</li>
      <li><strong>Advanced web scraping and discovery</strong> techniques to uncover hidden media across the web.</li>
      <li><strong>Edge computing</strong> systems to minimize environmental impact by processing data closer to the source.</li>
    </ul>
  </section>

  <!-- Sample Queries -->
  <section id="sample-queries" class="mb-12">
    <h2 class="text-2xl font-bold text-purple-800 underline mb-2">Sample Queries</h2>
    <h3>Here are some sample queries to try. Please see search page for specifics.</h3>
    <div class="bg-white border border-gray-300 p-4 font-mono text-sm text-gray-800 shadow-inner">
      <pre>
> "people dancing"
> "tv and broadcasts"
> "animals"
      </pre>
    </div>
  </section>

  <!-- Serca API -->
  <section id="api" class="mb-12">
    <h2 class="text-2xl font-bold text-purple-800 underline mb-2">Serca API</h2>
    <div class="bg-gray-100 border border-gray-400 p-4 font-mono text-sm">
      <p>We host an API. <strong>Not currently open to public.</strong></p>
    </div>
  </section>

  <!-- Highlighted Sites -->
  <section id="highlighted-sites" class="mb-12">
    <HighlightedSites />
  </section>

  <!-- Final Note -->
  <p class="text-center text-base text-gray-600 italic font-serif mt-8 mb-4">Kilroy Was Here!</p>
</div>

<!-- Newsletter -->
<Newsletter />

<h1 class="flex justify-center text-4xl m-4">Announcements</h1>

<!-- Announcements -->
<div class="max-w-5xl mx-auto mt-6 px-4">
  <Announcements title="Vudoo Group is currently building out this page" date="April 7, 2025" type="Development" content="We are properly in the development trenches now. We will keep you posted."/>
  <Announcements title="Page creation" date="April 4, 2025" type="Development" content="This page was created"/>
</div>

<!-- Footer -->
<Vudoo />

<style>
  body {
    background-color: #d8a6c7; /* Piss Purple Background */
    font-family: 'Courier New', Courier, monospace;
    color: #222;
  }

  a {
    color: #0044aa;
  }

  a:hover {
    color: #000;
    background-color: #ffe;
  }

  pre {
    background-color: #f9f9f9;
    padding: 0.5rem;
    overflow-x: auto;
    font-family: 'Courier New', Courier, monospace;
  }

  h2 {
    border-left: 4px solid #ccc;
    padding-left: 0.5rem;
  }

  /* Subtle highlight effect */
  ul li:hover {
    background-color: #f0f0f0;
  }
</style>
