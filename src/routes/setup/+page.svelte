<script lang="ts">
    import { base } from "$app/paths";
  import { geekmons, groups, getSource, type Geekmon, type Tag } from "$lib/geekmons";

  let playerNumber: number = $state(JSON.parse(localStorage.getItem("playerNumber")!) ?? 2);

  const expansioes = {
    base: "Base",
    aura_corrompida: "Aura Corrompida",
    desafio_dos_cristais: "Desafio dos Cristais",
    disputa_nas_arenas: "Disputa nas Arenas",
    novos_horizontes: "Novos Horizontes",
    catarse: "Catarse",
  } as Record<string, string>;

  let filteredGroups: string[] = $state([]);
  const selectedExpansions: string[] = $state(JSON.parse(localStorage.getItem("selectedExpansions")!) ?? ["base"]);
  const selectedGroups: string[] = $state(JSON.parse(localStorage.getItem("selectedGroups")!) ?? []);
  const selectedInitials: Geekmon[] = $state(JSON.parse(localStorage.getItem("selectedInitials")!) ?? []);

  $effect(() => {
    localStorage.setItem("selectedExpansions", JSON.stringify(selectedExpansions));
    localStorage.setItem("playerNumber", JSON.stringify(playerNumber));
    localStorage.setItem("selectedGroups", JSON.stringify(selectedGroups));
    localStorage.setItem("selectedExtraGeekmons", JSON.stringify(selectedExtraGeekmons));
    localStorage.setItem("selectedInitials", JSON.stringify(selectedInitials));

    filterGroups(); // Update filtered groups whenever selected expansions change
  });

  const selectPlayerCount = (n: number) => () => {
    playerNumber = n;
    selectedGroups.length = 0;

    selectRandomGroups(); // Re-select groups when player count changes
  };

  const filterGroups = () => {
    return (filteredGroups = Object.keys(groups).filter((group) => {
      const groupData = groups[group];
      return selectedExpansions.includes(groupData.source);
    }));
  };

  const soloMode = () => {
    return playerNumber == 1;
  };

  const selectGroup = (group: string) => () => {
    if (selectedGroups.includes(group)) {
      selectedGroups.splice(selectedGroups.indexOf(group), 1);
    } else {
      selectedGroups.push(group);
    }

    if (soloMode()) {
      selectRandomExtraGeekmons();
    }
  };

  const selectRandomInitials = () => {
    console.log("selectRandomInitials called"); // Debugging log
    const availableInitials = Object.values(geekmons).filter(
      (geekmon) =>
        geekmon.tags.includes("initial") && // Include only initial geekmons
        selectedExpansions.includes(getSource(geekmon)), // Filter geekmons based on selected expansions
    );

    const shuffledInitials = availableInitials.sort(() => Math.random() - 0.5);
    selectedInitials.length = 0; // Clear the current selection

    console.log("Shuffled Initials:", shuffledInitials); // Debugging log

    for (let i = 0; i < playerNumber; i++) {
      selectedInitials.push(shuffledInitials[i % shuffledInitials.length]);
    }
  };

  const selectRandomGroups = () => {
    const shuffledGroups = filteredGroups.sort(() => Math.random() - 0.5);
    selectedGroups.length = 0; // Clear the current selection

    const count = soloMode() ? 2 : playerNumber; // Select 2 groups for solo mode, otherwise select 1 group per player

    for (let i = 0; i < count; i++) {
      selectedGroups.push(shuffledGroups[i % filteredGroups.length]);
    }

    if (soloMode()) {
      selectRandomExtraGeekmons(); // Re-select extra geekmons when groups are selected
    }

    selectRandomInitials(); // Re-select initials when groups are selected
  };

  const selectExpansion = (expansion: string) => () => {
    if (selectedExpansions.includes(expansion)) {
      selectedExpansions.splice(selectedExpansions.indexOf(expansion), 1);
    } else {
      selectedExpansions.push(expansion);
    }

    if (soloMode() && !selectedExpansions.includes("disputa_nas_arenas")) {
      playerNumber = 2; // Set player number to 2 if "disputa_nas_arenas" is not selected
    }

    selectRandomGroups(); // Re-select groups when expansion changes
  };

  let selectedExtraGeekmons = $state(
    JSON.parse(localStorage.getItem("selectedExtraGeekmons")!) ?? ([] as Record<number, string[]>),
  );

  const selectRandomExtraGeekmons = () => {
    const availableGeekmons = Object.values(geekmons).filter(
      (geekmon) =>
        !(geekmon.groups ?? []).some((group) => selectedGroups.includes(group)) && // Exclude geekmons from selected groups
        geekmon.evolutions?.[0]?.length === 1 && // Exclude geekmons that have evolutions
        !["initial", "shiny", "over"].some(tag => geekmon.tags.includes(tag as Tag)) && // Exclude initial and shiny geekmons
        selectedExpansions.includes(getSource(geekmon)), // Filter geekmons based on selected expansions
    );

    const shuffledGeekmons = availableGeekmons.sort(() => Math.random() - 0.5);
    selectedExtraGeekmons = shuffledGeekmons.slice(0, 4); // Select 4 random geekmons
  };

  const randomGeekmonGroupColor = (geekmon: Geekmon) => {
    const geekmonData = Object.values(geekmons).find((g) => g.number == geekmon.number);
    if (geekmonData && geekmonData.groups) {
      const group = geekmonData.groups[Math.floor(Math.random() * geekmonData.groups.length)];
      return groups[group].color;
    }
    return "#1a202c"; // Default color in hexadecimal if no group is found
  };

  const init = () => {
    if (selectedGroups.length === 0) {
      selectRandomGroups();
    }
  };

  init();
</script>

<div class="mx-auto min-h-screen max-w-md rounded-3xl bg-gray-100 p-4 shadow-lg">
  <header class="mb-6 flex flex-row">
    <h1 class="text-2xl font-extrabold text-gray-900">Preparar partida</h1>
    <div class="ml-auto">
      <a href="${base}/" aria-label="home">
        <button class="rounded-xl bg-gray-200 p-1" aria-label="home">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 11l9-8 9 8M4 10v10h6v-6h4v6h6V10" />
          </svg>
        </button>
      </a>
    </div>
  </header>
  <div class="wrap mb-5 grid grid-cols-6 justify-items-center gap-1 rounded-xl bg-[#35a291] py-2 text-white">
    <div class="col-span-6 text-center uppercase">Expansões</div>
    <div class="col-span-6 flex flex-wrap justify-center gap-2">
      {#each Object.keys(expansioes) as expansion}
        <div class="col-span-6 flex flex-wrap justify-center gap-2">
          <button
            class={"align-items-center relative justify-items-center rounded-sm p-2 px-4 " +
              (selectedExpansions.includes(expansion) ? "bg-[#074f43]" : "bg-white text-gray-900")}
            onclick={selectExpansion(expansion)}
          >
            <img src={`${base}/img/logos/` + expansion + `.png`} alt="base" class="w-24" />
            <span class="block text-sm leading-none font-bold">{expansioes[expansion]}</span>
          </button>
        </div>
      {/each}
    </div>
  </div>
  <div class="wrap mb-5 grid grid-cols-6 justify-items-center gap-1 rounded-xl bg-[#35a291] py-2 text-white">
    <div class="col-span-6 text-center uppercase">Quantidade de Jogadores</div>
    <div class="col-span-6 flex flex-wrap justify-center gap-2 px-2">
      {#if selectedExpansions.includes("disputa_nas_arenas")}
        <button
          class={"align-items-center relative justify-items-center rounded-sm p-2 px-4 " +
            (soloMode() ? "bg-[#1c594f]" : "bg-white text-gray-900")}
          onclick={selectPlayerCount(1)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M19 21V19C19 17.9391 18.5786 16.9217 17.8284 16.1716C17.0783 15.4214 16.0609 15 15 15H9C7.93913 15 6.92172 15.4214 6.17157 16.1716C5.42143 16.9217 5 17.9391 5 19V21"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span class="block text-sm leading-none font-bold">solo</span>
        </button>
      {/if}
      {#each [2, 3, 4, 5, 6] as n}
        <button
          onclick={selectPlayerCount(n)}
          class={"align-items-center relative justify-items-center rounded-sm p-2 px-4 " +
            (playerNumber == n ? "bg-[#1c594f]" : "bg-white text-gray-900")}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M22 21V19C21.9993 18.1137 21.7044 17.2528 21.1614 16.5523C20.6184 15.8519 19.8581 15.3516 19 15.13"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span class="block text-sm leading-none font-bold">{n}</span>
        </button>
      {/each}
    </div>
  </div>
  <div class="wrap mb-5 grid grid-cols-6 justify-items-center gap-1 rounded-xl bg-[#35a291] py-2 text-white">
    <div class="col-span-1"></div>
    <div class="col-span-4 text-center uppercase">Conjuntos</div>
    <div class="col-span-1 uppercase">
      <button onclick={selectRandomGroups}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-dices-icon lucide-dices"
        >
          <rect width="12" height="12" x="2" y="10" rx="2" ry="2" />
          <path d="m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6" />
          <path d="M6 18h.01" />
          <path d="M10 14h.01" />
          <path d="M15 6h.01" />
          <path d="M18 9h.01" />
        </svg>
      </button>
    </div>
    <div class="col-span-6 flex flex-wrap justify-center gap-2 px-5">
      {#each filteredGroups as group}
        <div
          onclick={selectGroup(group)}
          class="flex h-8 w-8 items-center justify-center rounded-full"
          style="background-color: {groups[group].color}; border: {selectedGroups.includes(group)
            ? '2px solid ' + (group == 'black' ? 'white' : 'black')
            : 'none'};"
        >
          {#if selectedGroups.includes(group)}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              stroke={group == "black" ? "white" : "black"}
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              viewBox="0 0 24 24"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          {/if}
        </div>
      {/each}
      {#if selectedGroups.length != (soloMode() ? 2 : playerNumber)}
        <span class="text-center text-sm text-[#ffc7c7]"
          >Número de conjuntos inválido, você deve selecionar {soloMode() ? 2 : playerNumber} conjuntos</span
        >
      {/if}
    </div>
  </div>
  {#if soloMode()}
    <div class="wrap mb-5 grid grid-cols-6 justify-items-center gap-1 rounded-xl bg-[#35a291] py-2 text-white">
      <div class="col-span-1"></div>
      <div class="col-span-4 text-center uppercase">4 Geekmons selvagens extras</div>
      <div class="col-span-1 uppercase">
        <button onclick={selectRandomExtraGeekmons}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-dices-icon lucide-dices"
          >
            <rect width="12" height="12" x="2" y="10" rx="2" ry="2" />
            <path d="m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6" />
            <path d="M6 18h.01" />
            <path d="M10 14h.01" />
            <path d="M15 6h.01" />
            <path d="M18 9h.01" />
          </svg>
        </button>
      </div>
      <div class="col-span-6 flex flex-row flex-wrap justify-center gap-2">
        <div class="flex flex-wrap justify-center gap-2 font-mono text-gray-900">
          {#if selectedGroups.length < 2}
            <span class="text-center text-sm text-[#ffc7c7]">Selecione pelo menos 2 conjuntos</span>
          {:else}
            {#each selectedExtraGeekmons as geekmon}
              <button
                class="text-md inline-flex cursor-pointer items-center rounded-full bg-white px-2.5 py-0.5 font-semibold transition-colors select-none"
              >
                {#if geekmon.groups}
                  <svg
                    class="mr-1 size-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={randomGeekmonGroupColor(geekmon)}
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="12" cy="12" r="12" />
                  </svg>
                {/if}
                {geekmon.number}
              </button>
            {/each}
          {/if}
        </div>
      </div>
    </div>
  {/if}
  <div class="wrap mb-5 grid grid-cols-6 justify-items-center gap-1 rounded-xl bg-[#35a291] py-2 text-white">
    <div class="col-span-1"></div>
    <div class="col-span-4 text-center uppercase">Geekmon inicial</div>
    <div class="col-span-1">
      <button onclick={selectRandomInitials}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-dices-icon lucide-dices"
        >
          <rect width="12" height="12" x="2" y="10" rx="2" ry="2" />
          <path d="m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6" />
          <path d="M6 18h.01" />
          <path d="M10 14h.01" />
          <path d="M15 6h.01" />
          <path d="M18 9h.01" />
        </svg>
      </button>
    </div>
    <div class="mt-2 col-span-6 flex flex-row flex-wrap justify-center gap-2 px-2">
      <div class="flex flex-wrap justify-center gap-2 font-mono text-gray-900">
        {#each selectedInitials as geekmon, index}
          <div class="flex flex-row justify-center align-items-center mb-5 rounded-xl bg-gray-200 relative p-5 py-5 text-center shadow-md relative">
            <img src={`${base}/img/geekmons/${geekmon.number}.png`} alt="" class="size-22" />
            <div class="absolute -top-3 p-1 px-2 rounded-xl bg-gray-200 text-center font-bold shadow-md">Jogador {index + 1}</div>
            <div class="absolute -bottom-3 w-[80%] rounded-xl bg-gray-200 text-center font-bold">{geekmon.number}</div>
            <div class="absolute top-0 left-0 z-60 mx-auto flex h-full w-full items-center justify-center">
              <span
                class="flex size-15 items-center justify-center rounded-full text-2xl font-bold text-white"
              >
              </span>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
