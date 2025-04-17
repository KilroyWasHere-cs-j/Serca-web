<script lang="ts">
  import { goto } from '$app/navigation';

  function navigate(path: string) {
    goto(path);
  }
</script>

<nav class="w-full bg-gray-800 text-white py-4 px-6 shadow-xl border-t-4 border-b-4 border-gray-600 flex justify-between items-center">
  <div class="text-3xl font-serif cursor-pointer" on:click={() => navigate('/')}>
    🔍 Serca
  </div>
  <div class="space-x-6 text-lg font-serif">
    <button
      on:click={() => navigate('/')}
      class="navbar-button hover:bg-gray-700"
    >
      Home
    </button>
    <button
      on:click={() => navigate('/serca-search')}
      class="navbar-button hover:bg-gray-700"
    >
      Search
    </button>
    <button
      on:click={() => navigate('/database')}
      class="navbar-button hover:bg-gray-700"
    >
      Database
    </button>
    <button
      on:click={() => navigate('/vudoogroup')}
      class="navbar-button hover:bg-gray-700"
    >
      Vudoo Group
    </button>
  </div>
</nav>

<style>
  /* General button styling */
  .navbar-button {
    background-color: #333;
    color: white;
    border: 2px solid #444;
    padding: 5px 15px;
    text-decoration: none;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    border-radius: 5px;
  }

  /* Hover effect without flashy colors */
  .navbar-button:hover {
    background-color: #555;
    color: white;
  }

  /* Navbar base styles */
  nav {
    background-color: #333;
    color: white;
    border-top: 3px solid #444;
    border-bottom: 3px solid #444;
    text-align: center;
    padding: 10px 0;
    font-family: 'Arial', sans-serif;
    font-size: 18px;
  }

  /* Simple text shadow for logo */
  .text-shadow {
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }

  /* Space out navbar elements */
  .space-x-6 {
    display: flex;
    gap: 1.5rem;
  }

  /* Clean hover effect on the logo */
  nav div:hover {
    text-decoration: underline;
    color: #ccc; /* Subtle color change */
  }
</style>
