<script lang="ts">
  import { onNavigate } from "$app/navigation";
  import Tag from "$lib/components/tag.svelte";
  import { geekmons, getSource, Gradients } from "$lib/geekmons";
  import { fade } from "svelte/transition";
  import type { PageProps } from "./$types";
  import { without } from "underscore";

  const { data }: PageProps = $props();
  const { geekmon, idx } = $derived(data);

  let shiny = $state(false);
  let showRef = $state(false);
  let bioClickCount = $state(0);

  let captured: string[] = $state(JSON.parse(localStorage.getItem("captured")!) ?? []);

  const accent = $derived(Gradients[geekmon.elements[0]][1]);

  $effect(() => {
    localStorage.setItem("captured", JSON.stringify(captured));
  });

  $effect(() => {
    if (bioClickCount >= 5) {
      showRef = true;
      document.body.classList.add("overflow-y-hidden");
    } else {
      showRef = false;
      document.body.classList.remove("overflow-y-hidden");
    }
  });

  onNavigate(() => {
    shiny = false;
    showRef = false;
    bioClickCount = 0;
  });
</script>

<div
  class="mx-auto min-h-screen max-w-md transition-colors duration-500 ease-in-out"
  style:background={shiny ? "radial-gradient(#d0b0ee, #776a78)" : `radial-gradient(${accent}, ${accent})`}
>
  <!-- Top div -->
  <div class="relative px-6 pt-8 pb-6 text-white">
    <!-- Top bar -->
    <div class="grid grid-cols-[4rem_1fr_4rem] gap-2">
      {#if idx > 0}
        <a href={`/geekmon/${geekmons[idx - 1]?.number}`}>
          <button class="flex flex-row" aria-label="return">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            #{geekmons[idx - 1]?.number}
          </button>
        </a>
      {:else}
        <div></div>
      {/if}
      <a class="text-center" href={`/`} aria-label="home">
        <button aria-label="home">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 11l9-8 9 8M4 10v10h6v-6h4v6h6V10" />
          </svg>
        </button>
      </a>
      {#if idx < geekmons.length - 1}
        <a href={`/geekmon/${geekmons[idx + 1]?.number}`}>
          <button class="flex flex-row" aria-label="captured">
            #{geekmons[idx + 1]?.number}
            <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19 l7-7 -7-7" />
            </svg>
          </button>
        </a>
      {:else}
        <div></div>
      {/if}
    </div>

    <!-- Name, number, type and image -->
    <div class="mt-6 mb-3 text-center">
      <div class="flex flex-row items-center justify-between">
        <h1 class="text-3xl font-extrabold">{geekmon.name}</h1>
        <p class="text-sm font-semibold text-white/80">#{geekmon.number}</p>
      </div>

      <div class="mt-3 flex gap-1">
        {#each geekmon.elements as type (type)}
          <img src={`/img/elements/${type}.png`} alt={type} class="size-8" />
        {/each}
        <img src={`/img/elements/${geekmon.weakness}_weak.png`} alt={geekmon.weakness} class="ml-auto size-8" />
      </div>

      <div class="relative size-62 w-full bg-[url('/img/hex_bg.svg')] bg-center bg-no-repeat">
        {#key geekmon.number}
          <img
            transition:fade={{ duration: 300 }}
            src={`/img/geekmons/${shiny ? "shiny/" : ""}${geekmon.number}.png`}
            alt={geekmon.name}
            class="absolute right-0 left-0 z-10 mx-auto size-62"
            onclick={() => (shiny = !shiny)}
          />
        {/key}
        {#if shiny}
          <img
            transition:fade={{ duration: 300 }}
            src={`/img/shiny.png`}
            alt={geekmon.name}
            class="absolute -top-10 right-0 left-0 z-20 mx-auto size-80 opacity-40"
            onclick={() => (shiny = !shiny)}
          />
        {/if}
      </div>
    </div>

    <!-- Tags -->
    <div class="flex h-5 flex-row gap-2">
      {#each geekmon.tags as tag (tag)}
        <Tag {tag} />
      {/each}
      <!-- {#if shiny}
        <Tag tag="shiny" />
      {/if} -->
    </div>
  </div>

  <!-- Bottom div -- info and bio -->
  <div class="-mt-4 rounded-3xl bg-white p-6 shadow-lg">
    {#if getSource(geekmon) !== "base"}
      <img class="mx-auto max-h-20" src="/img/logos/{getSource(geekmon)}.png" alt="" />
    {/if}

    <h2 class="mb-3 text-lg font-bold underline" onclick={() => bioClickCount++}>Bio</h2>
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
      {#each geekmon.habitat as habitat (habitat)}
        <img src={`/img/hab_${habitat}.png`} alt={habitat} class="size-20" />
      {/each}
    </div>

    <h2 class="mt-3 mb-3 text-lg font-bold underline">Evoluções</h2>
    <div class="mt-3 flex flex-row flex-wrap justify-center gap-5">
      {#each geekmon.evolutions as lines (lines)}
        <div class="flex justify-center gap-5">
          {#each lines as evo (evo)}
            <div class="mb-5 rounded-xl bg-gray-100 p-2 text-center shadow-md">
              <a href={`/geekmon/${evo}`}>
                <img src={`/img/geekmons/${evo}.png`} alt={evo} class="size-20" />
              </a>
              <div class=" mx-auto -mb-5 w-[80%] rounded-xl bg-gray-200 text-center">{evo}</div>
            </div>
          {/each}
        </div>
      {/each}
    </div>
  </div>

  <!-- Captured -->
  <div class="relative px-6 py-3 text-center text-white">
    <button
      onclick={() =>
        captured.includes(geekmon.number) ? (captured = without(captured, geekmon.number)) : captured.push(geekmon.number)}
    >
      [icone de captura/cubo]
    </button>
  </div>

  {#if showRef}
    <div
      transition:fade
      class="fixed top-0 left-0 z-60 flex h-screen w-screen items-center bg-gray-700/60 px-10"
      onclick={() => (bioClickCount = 0)}
    >
      <div class="rounded-3xl bg-white p-6 shadow-lg">
        <h2 class="mb-3 text-lg font-bold underline">Referência Geek</h2>
        <div class="text-justify">
          {geekmon.ref}
        </div>
      </div>
    </div>
  {/if}
</div>
