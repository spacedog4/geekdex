<script lang="ts">
  import { GeekmonMap, Gradients } from "$lib/geekmons";
  import type { PageProps } from "./$types";

  const { data }: PageProps = $props();
  const { geekmon } = data;
</script>

<div class="min-h-screen" style:background={Gradients[geekmon.elements[0]][1]}>
  <div class="relative px-6 pt-8 pb-6 text-white">
    <div class="flex items-center justify-between">
      <button aria-label="return">
        <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button aria-label="captured">
        <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </button>
    </div>

    <div class="mt-6 text-center">
      <div class="flex flex-row items-center justify-between">
        <h1 class="text-3xl font-extrabold">{geekmon.name}</h1>
        <p class="text-sm font-semibold text-white/80">#{geekmon.number}</p>
      </div>

      <div class="mt-3 flex gap-1">
        {#each geekmon.elements as type}
          <img src={`/img/el_${type}.png`} alt={type} class="size-8" />
        {/each}
        <img src={`/img/el_${geekmon.weakness}_weak.png`} alt={geekmon.weakness} class="ml-auto size-8" />
      </div>

      <img src={`/img/${geekmon.number}.png`} alt={geekmon.name} class="relative z-10 mx-auto -mt-4 size-48" />
    </div>
  </div>

  <div class="-mt-4 rounded-t-3xl bg-white p-6 shadow-lg">
    <h2 class="mb-3 text-lg font-bold underline">Bio</h2>
    <div class="text-justify">
      {geekmon.description}
    </div>

    <h2 class="mt-3 mb-3 text-lg font-bold underline">Info</h2>
    <div class="mb-6 flex justify-between text-sm">
      <div class="text-gray-600">Altura</div>
      <div class="font-semibold">{geekmon.height}m</div>
    </div>
    <div class="mb-6 flex justify-between text-sm">
      <div class="text-gray-600">Peso</div>
      <div class="font-semibold">{geekmon.weight}kg</div>
    </div>

    <h2 class="mt-3 mb-3 text-lg font-bold underline">Habitats</h2>
    <div class="mt-3 flex gap-1">
      {#each geekmon.habitat as habitat}
        <img src={`/img/hab_${habitat}.png`} alt={habitat} class="size-20" />
      {/each}
    </div>

    <h2 class="mt-3 mb-3 text-lg font-bold underline">Evoluções</h2>
    <div class="mt-3 flex justify-center gap-5">
      {#each geekmon.evolutions as evo}
        <img src={`/img/${evo}.png`} alt={evo} class="size-20" />
      {/each}
    </div>
  </div>
</div>
