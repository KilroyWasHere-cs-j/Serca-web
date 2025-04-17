<script lang="ts">
  import Navbar from '../../components/Navbar.svelte'; // Adjust path as needed
  let query = '';
  
  function handleSearch() {
    alert(`Searching for: ${query}`);
  }
</script>

<Navbar />

<!-- Fullscreen Centered Page -->
<div class="min-h-screen flex items-center justify-center bg-gray-200">

  <!-- Centered Search Box -->
  <div class="bg-white p-8 rounded-2xl border border-gray-600 text-center max-w-xl w-full">

    <h1 class="retro-font text-4xl text-gray-800 mb-6">Serca Search</h1>

    <input
      bind:value={query}
      type="text"
      placeholder="Describe your media here..."
      class="retro-font w-full p-4 text-lg rounded-lg border-2 border-gray-400 bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
    />

    <button
      on:click={handleSearch}
      class="retro-font mt-6 bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-6 rounded border-2 border-blue-600"
    >
      Search
    </button>

    <p class="retro-font text-gray-600 mt-6 italic">"We find what the internet forgot"</p>
  </div>

</div>

<style>
  /* Retro font */
  .retro-font {
    font-family: 'Courier New', Courier, monospace;
    font-size: 16px;
    color: #333333;
    line-height: 1.5;
  }

  /* Simple bounce animation for title */
  @keyframes bounce {
    0% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
    100% { transform: translateY(0); }
  }

  .animate-bounce {
    animation: bounce 1s infinite;
  }

  /* Button and input fields look more retro */
  input, button {
    font-family: 'Courier New', Courier, monospace;
  }

  /* Button Styles */
  button {
    background-color: #0066CC; /* Retro blue */
    border: 1px solid #003366; /* Dark blue border */
    color: white;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  button:hover {
    background-color: #0055BB; /* Slightly darker blue on hover */
  }

  /* Input field */
  input {
    border: 1px solid #BBBBBB; /* Dull gray border */
    background-color: #F5F5F5; /* Very light gray */
  }

  input:focus {
    border-color: #0066CC;
    background-color: #FFFFFF;
  }

  /* Background color */
  body {
    background-color: #E0E0E0; /* Light gray */
  }

  /* Text styling */
  h1, p {
    font-family: 'Courier New', Courier, monospace;
  }
</style>
