<script lang="ts">
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Search", href: "/serca-search" },
    { name: "Sign-Up", href: "/sign-up" },
    { name: "Info", href: "/info" },
    { name: "Report", href: "/report" },
    { name: "Abscissa", href: "https://www.abscissa.dev/home", external: true },
  ];
</script>

<nav class="flex justify-center border-b border-gray-100 bg-white py-6">
  <div class="flex items-center gap-8">
    {#each navLinks as link}
      <a
        href={link.href}
        target={link.external ? "_blank" : "_self"}
        rel={link.external ? "noreferrer" : ""}
        class="group relative text-sm font-medium tracking-wide text-gray-500 transition-colors duration-200 hover:text-black"
      >
        {link.name}
        <span class="absolute -bottom-1 left-0 h-px w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
      </a>
    {/each}
  </div>
</nav>