<script lang="ts">
  import { goto } from "$app/navigation";
  import { geekmons, Gradients } from "$lib/geekmons";
  import { sample } from "underscore";

  let search = $state("");

  const filtered = $derived(() =>
    geekmons.filter(
      (p) => !p.hidden && (p.name.toLowerCase().includes(search.trim().toLowerCase()) || p.number.includes(search.trim())),
    ),
  );

  const captured: string[] = $state(JSON.parse(localStorage.getItem("captured")!) ?? []);
</script>

<div class="mx-auto min-h-screen max-w-md rounded-3xl bg-gray-100 p-4 shadow-lg">
  <header class="mb-6 flex flex-row">
    <h1 class="text-4xl font-extrabold text-gray-900">Geekdex</h1>
    <div class="ml-auto">
      <a href="/calculator" aria-label="calculator">
        <button class="rounded-xl bg-gray-200 p-1" aria-label="calculator">
          <svg class="h-7 w-7 fill-gray-700 text-gray-700" viewBox="0 -960 960 960">
            <path
              d="M320-240h60v-80h80v-60h-80v-80h-60v80h-80v60h80v80Zm200-30h200v-60H520v60Zm0-100h200v-60H520v60Zm44-152 56-56 56 56 42-42-56-58 56-56-42-42-56 56-56-56-42 42 56 56-56 58 42 42Zm-314-70h200v-60H250v60Zm-50 472q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"
            />
          </svg>
        </button>
      </a>
    </div>
  </header>

  <div class="mb-6 flex items-center gap-2">
    <div class="relative flex-1">
      <input
        type="text"
        bind:value={search}
        placeholder="Nome ou número"
        class="w-full rounded-xl border border-gray-300 py-2 pr-4 pl-10 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
      <svg
        class="absolute top-2.5 left-3 h-5 w-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
      </svg>
    </div>

    <button
      class="rounded-xl bg-gray-200 p-2"
      aria-label="filters"
      onclick={() => goto(`/geekmon/${sample(geekmons, 1)[0].number}`)}
    >
      <svg class="size-5 fill-gray-700" viewBox="0 -960 960 960">
        <path
          d="M560-160v-80h104L537-367l57-57 126 126v-102h80v240H560Zm-344 0-56-56 504-504H560v-80h240v240h-80v-104L216-160Zm151-377L160-744l56-56 207 207-56 56Z"
        />
      </svg>
    </button>
  </div>

  <!-- Pokémon Cards Grid -->
  <div class="grid grid-cols-2 gap-4">
    {#each filtered() as item}
      <div class={`flex flex-col rounded-xl p-4 text-center`} style:background={Gradients[item.elements[0]][0]}>
        <a href={`/geekmon/${item.number}`}>
          <img src={`/img/geekmons/${item.number}.png`} alt={item.name} class="mx-auto w-full" />
        </a>
        <h2 class="mt-auto text-lg font-bold text-gray-800">{item.name}</h2>
        <p class="text-sm text-gray-600">#{item.number}</p>
      </div>
    {/each}
  </div>
</div>
