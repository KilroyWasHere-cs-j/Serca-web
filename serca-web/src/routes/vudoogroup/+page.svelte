<script lang="ts">
    import Navbar from '../../components/Navbar.svelte'; // Adjust if needed
  </script>
  
  <Navbar />
  
  <!-- Background Section -->
  <div class="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white font-sans px-6 py-16">
  
    <!-- Hero Section -->
    <section class="max-w-7xl mx-auto text-center mb-20">
      <h1 class="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-purple-300 drop-shadow-md">
        Vudoo Group
      </h1>
      <p class="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
        Building futuristic software solutions with intelligence, precision, and style.
      </p>
    </section>
  
    <!-- Info Grid -->
    <section class="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
  
      <!-- Card 1 -->
      <div class="backdrop-blur-md bg-white/5 border border-purple-500 rounded-xl p-6 shadow-lg hover:scale-105 transition-transform duration-300">
        <h2 class="text-2xl font-bold text-purple-400 mb-4">AI & Automation</h2>
        <p class="text-gray-300">We specialize in intelligent automation tools that boost business efficiency and decision-making.</p>
      </div>
  
      <!-- Card 2 -->
      <div class="backdrop-blur-md bg-white/5 border border-purple-500 rounded-xl p-6 shadow-lg hover:scale-105 transition-transform duration-300">
        <h2 class="text-2xl font-bold text-purple-400 mb-4">Custom Software</h2>
        <p class="text-gray-300">From startups to enterprise, we craft custom platforms tailored to your vision and workflow.</p>
      </div>
  
      <!-- Card 3 -->
      <div class="backdrop-blur-md bg-white/5 border border-purple-500 rounded-xl p-6 shadow-lg hover:scale-105 transition-transform duration-300">
        <h2 class="text-2xl font-bold text-purple-400 mb-4">Innovation Lab</h2>
        <p class="text-gray-300">Where ideas meet execution—our R&D team explores tech frontiers like AR, blockchain, and neural interfaces.</p>
      </div>
  
    </section>
  
    <!-- Footer/CTA -->
    <section class="mt-32 text-center">
      <p class="text-gray-400 text-lg mb-4">Let’s build the future together.</p>
      <button class="px-8 py-3 bg-purple-700 hover:bg-purple-600 text-white font-bold rounded-full shadow-lg transition duration-300">
        Contact Vudoo
      </button>
    </section>
  
  </div>
  
  <style>
    /* Optional: smooth background animation */
    body {
      background: black;
    }
  </style>
  