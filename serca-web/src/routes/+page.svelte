<script lang="ts">
    import Navbar from "../components/Navbar.svelte";
    import Announcements from "../components/Announcements.svelte";
    import HighlightedSites from "../components/HighlightedSites.svelte";
    import Newsletter from "../components/Newsletter.svelte";
    import Vudoo from "../components/Vudoo.svelte";
</script>

<Navbar />

<!-- Main Section with Red Bars on Sides -->
<div class="flex flex-col md:flex-row items-center justify-center py-10 gap-8 text-center md:text-left">

  <!-- Left Red Bar -->
  <div class="hidden md:block w-4 bg-red-600 h-full absolute left-0 top-0 bottom-0"></div>

  <!-- Text Content -->
  <div class="md:w-1/2 relative z-10 bg-black p-2 w-screen">
    <h1 class="text-4xl text-white font-serif mb-4">Serca: AI powered media search engine</h1>
    <p class="font-serif text-lg text-white italic">"We find what the internet forgot"</p>
  </div>
  
  <!-- GIF -->
  <div class="md:w-1/3 relative z-10">
    <img 
      src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExazhvZHBmMmwzYWdkcXQ2dndpZmY4Mzdob3B1azFvYWV6YmExbG4wdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZZLzLZjzL1m9XWGjAG/giphy.gif" 
      alt="AI search GIF"
      class="w-full max-w-xs mx-auto md:mx-0 rounded shadow-lg"
    />
  </div>

  <!-- Right Red Bar -->
  <div class="hidden md:block w-4 bg-red-600 h-full absolute right-0 top-0 bottom-0"></div>
  
</div>

<hr class="my-10 border-t-4 border-green-600 w-1/2 mx-auto rounded">

<div class="text-center py-8">
  <h2 class="text-4xl font-serif mb-3">What is Serca</h2>
  <p class="font-serif text-lg max-w-2xl mx-auto">Serca is an AI-powered media search engine, allowing you to search media by describing it in plain text.</p>
</div>

<Newsletter />

<Announcements />

<div class="flex flex-row">
    <div class="md:w-1/3 relative z-10 flex justify-center">
        <img 
          src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjVvY204azNkYWtuNzNrZ2YxNDg0cnFuZHh6NjRoeWJiZm4xaTJrdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/jsNxmqtYu7iLACiP5f/giphy.gif" 
          alt="AI search GIF"
          class="w-full max-w-xs mx-auto md:mx-0 rounded shadow-lg"
        />
    </div>
    <div class="flex justify-end w-full mr-10">
        <div class="flex flex-col">
            <p>dmifvojijoi34fjecm9034fie2i03f0309if0fi</p>
            <p>eoiwfj9i04k09ip,poK()U(*G^%Tjkpo0392idkiowniu)</p>
            <p> ejkwn8uh%R*OIUJ&*T^nekjnf98</p>
            <p>dsklncuihe87jklNT^R*UJIh789hui^%Rs</p>
            </div>
    </div>
</div>

<HighlightedSites />

<p class="text-white">Kilroy Was Here!</p>

<Vudoo />

<p class="text-white m-10">They are watching they us everywhere. In the walls up the walls. Bagels... I see them in my dreams they call me.</p>