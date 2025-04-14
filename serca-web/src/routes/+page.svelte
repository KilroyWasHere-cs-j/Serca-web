<script lang="ts">
    import Navbar from "../components/Navbar.svelte";
    import Announcements from "../components/Announcements.svelte";
    import HighlightedSites from "../components/HighlightedSites.svelte";
    import Newsletter from "../components/Newsletter.svelte";
    import Vudoo from "../components/Vudoo.svelte";
</script>

<Navbar />

<!-- Main Section with Red Bars on Sides and Flashing Text -->
<div class="flex flex-col md:flex-row items-center justify-center py-10 gap-8 text-center md:text-left">

  <!-- Left Red Bar -->
  <div class="hidden md:block w-4 bg-red-600 h-full absolute left-0 top-0 bottom-0 animate-pulse"></div>

  <!-- Text Content -->
  <div class="md:w-1/2 relative z-10 bg-black p-6 rounded-xl border-4 border-yellow-500 shadow-lg">
    <h1 class="text-4xl text-white font-serif mb-4 text-shadow animate-bounce">Serca: AI powered media search engine</h1>
    <p class="font-serif text-lg text-white italic text-shadow animate-pulse">"We find what the internet forgot"</p>
  </div>
  
  <!-- GIF -->
  <div class="md:w-1/3 relative z-10">
    <img 
      src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExazhvZHBmMmwzYWdkcXQ2dndpZmY4Mzdob3B1azFvYWV6YmExbG4wdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZZLzLZjzL1m9XWGjAG/giphy.gif" 
      alt="AI search GIF"
      class="w-full max-w-xs mx-auto md:mx-0 rounded-lg shadow-xl animate-spin"
    />
  </div>

  <!-- Right Red Bar -->
  <div class="hidden md:block w-4 bg-red-600 h-full absolute right-0 top-0 bottom-0 animate-pulse"></div>
  
</div>

<hr class="my-10 border-t-4 border-green-600 w-1/2 mx-auto rounded-xl shadow-xl animate-pulse">

<!-- What is Serca Section with a Flashing Text -->
<div class="text-center py-8 bg-gradient-to-r from-blue-500 via-green-500 to-purple-500">
  <h2 class="text-4xl font-serif mb-3 text-shadow animate-flash">What is Serca</h2>
  <p class="font-serif text-lg max-w-2xl mx-auto text-shadow animate-flash">Serca is an AI-powered media search engine, allowing you to search media by describing it in plain text.</p>
</div>

<Newsletter />

<Announcements />

<!-- 2000s Styled GIF Section with Tacky Backgrounds -->
<div class="flex flex-row bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 p-4 rounded-xl shadow-lg animate-pulse">
    <div class="md:w-1/3 relative z-10 flex justify-center">
        <img 
          src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjVvY204azNkYWtuNzNrZ2YxNDg0cnFuZHh6NjRoeWJiZm4xaTJrdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jsNxmqtYu7iLACiP5f/giphy.gif" 
          alt="AI search GIF"
          class="w-full max-w-xs mx-auto md:mx-0 rounded-xl shadow-2xl animate-ping"
        />
    </div>
    <div class="flex justify-end w-full mr-10 text-white text-lg font-serif">
        <div class="flex flex-col">
            <p class="bg-gray-900 p-2 rounded-lg mb-2 shadow-lg animate-pulse">dmifvojijoi34fjecm9034fie2i03f0309if0fi</p>
            <p class="bg-gray-900 p-2 rounded-lg mb-2 shadow-lg animate-pulse">eoiwfj9i04k09ip,poK()U(*G^%Tjkpo0392idkiowniu)</p>
            <p class="bg-gray-900 p-2 rounded-lg mb-2 shadow-lg animate-pulse"> ejkwn8uh%R*OIUJ&*T^nekjnf98</p>
            <p class="bg-gray-900 p-2 rounded-lg mb-2 shadow-lg animate-pulse">dsklncuihe87jklNT^R*UJIh789hui^%Rs</p>
        </div>
    </div>
</div>

<HighlightedSites />

<p class="text-center text-2xl text-white font-serif mt-4 text-shadow animate-flash">Kilroy Was Here!</p>

<Vudoo />

<!-- Flashing Text Animation -->
<style>
  @keyframes flash {
    0% { color: red; }
    50% { color: yellow; }
    100% { color: green; }
  }
  
  .animate-flash {
    animation: flash 1s infinite;
  }

  .animate-bounce {
    animation: bounce 1s infinite;
  }

  .animate-spin {
    animation: spin 3s infinite;
  }

  .animate-pulse {
    animation: pulse 1s infinite;
  }

  .animate-ping {
    animation: ping 1s infinite;
  }

  /* Text Shadow */
  .text-shadow {
    text-shadow: 2px 2px 5px #FF00FF, 0 0 25px #FF00FF, 0 0 5px #FF00FF;
  }
</style>

