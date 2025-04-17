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
      <li><a href="#data-strings" class="hover:underline">Raw Data Strings</a></li>
      <li><a href="#highlighted-sites" class="hover:underline">Highlighted Sites</a></li>
    </ul>
  </div>

  <!-- What is Serca -->
  <section id="what-is-serca" class="mb-12">
    <h2 class="text-2xl font-bold text-purple-800 underline mb-2">What is Serca?</h2>
    <p>
      Serca is a specialized media search engine that leverages advanced AI to find forgotten or hard-to-describe content.
      Built to search images, video, audio and more through natural language.
    </p>
  </section>

  <!-- How It Works -->
  <section id="how-it-works" class="mb-12">
    <h2 class="text-2xl font-bold text-purple-800 underline mb-2">How It Works</h2>
    <ul class="list-disc list-inside text-gray-800">
      <li>Neural embeddings trained on public archives</li>
      <li>Multimodal indexing (image, audio, video)</li>
      <li>Uses vector search and prompt tuning</li>
    </ul>
  </section>

  <!-- Sample Queries -->
  <section id="sample-queries" class="mb-12">
    <h2 class="text-2xl font-bold text-purple-800 underline mb-2">Sample Queries</h2>
    <div class="bg-white border border-gray-300 p-4 font-mono text-sm text-gray-800 shadow-inner">
      <pre>
> "vintage footage of people ice skating"
> "an old TV commercial for a 90s toy"
> "someone ranting in a grainy YouTube video"
      </pre>
    </div>
  </section>

  <!-- Raw Strings -->
  <section id="data-strings" class="mb-12">
    <h2 class="text-2xl font-bold text-purple-800 underline mb-2">Raw Data Strings</h2>
    <div class="bg-gray-100 border border-gray-400 p-4 font-mono text-sm">
      <ul class="list-disc list-inside space-y-1">
        <li>dmifvojijoi34fjecm9034fie2i03f0309if0fi</li>
        <li>eoiwfj9i04k09ip,poK()U(*G^%Tjkpo0392idkiowniu)</li>
        <li>ejkwn8uh%R*OIUJ&*T^nekjnf98</li>
        <li>dsklncuihe87jklNT^R*UJIh789hui^%Rs</li>
      </ul>
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

<!-- Announcements -->
<div class="max-w-5xl mx-auto mt-6 px-4">
  <Announcements />
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
