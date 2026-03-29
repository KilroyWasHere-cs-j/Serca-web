<script lang="ts">
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Search", href: "/serca-search" },
    { name: "Sign-Up", href: "/sign-up" },
    { name: "Info", href: "/info" },
    // { name: "Report", href: "/report" },
    { name: "Abscissa", href: "https://www.abscissa.dev/home", external: true },
  ];
</script>

<nav class="flex justify-center bg-violet-800 py-8 shadow-xl">
  <div class="flex items-center gap-10">
    {#each navLinks as link}
      <a
        href={link.href}
        target={link.external ? "_blank" : "_self"}
        rel={link.external ? "noreferrer" : ""}
        class="group relative text-xs font-bold uppercase tracking-[0.2em] text-indigo-200 transition-colors duration-300 hover:text-white"
      >
        {link.name}
        
        <span 
          class="absolute -bottom-2 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-white transition-all duration-300 group-hover:w-full"
        ></span>
      </a>
    {/each}
  </div>
</nav>