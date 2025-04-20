<script lang="ts">
  import { calculatePoints } from "$lib/calculator";
  import { GeekmonMap, geekmons } from "$lib/geekmons";
  import { without } from "underscore";

  let player = $state(1);
  const captured = $state(
    JSON.parse(localStorage.getItem("calculator")!) ??
      ({
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
      } as Record<number, string[]>),
  );

  $effect(() => {
    localStorage.setItem("calculator", JSON.stringify(captured));
  });

  const colors = {
    1: "#007300",
    2: "#676dc3",
    3: "#f6b644",
    4: "#4d4d4d",
    5: "#cc0000",
    6: "blue",
  } as Record<number, string>;

  function reset() {
    captured[1] = [];
    captured[2] = [];
    captured[3] = [];
    captured[4] = [];
    captured[5] = [];
    captured[6] = [];
  }

  function pointMap(captured: string[]) {
    const rawCaptured = new Set(captured.map((c) => c.split(":")[0]));
    const points: Record<string, number> = {};

    for (const c of captured) {
      const [number, ...flags] = c.split(":");
      const shiny = flags.includes("s");

      points[c] = calculatePoints(number, rawCaptured, shiny);
    }

    return points;
  }

  function calculate(captured: string[]) {
    return Object.values(pointMap(captured)).reduce((a, b) => a + b, 0);
  }

  function toggle(n: string) {
    const shiny = n + ":s";

    // let newCaptured = [...captured[player]];
    if (captured[player].includes(n)) {
      captured[player] = without(captured[player], n);
      captured[player].push(shiny);
    } else if (captured[player].includes(shiny)) {
      captured[player] = without(captured[player], shiny);
    } else {
      captured[player].push(n);
    }
  }
</script>

<div class="mx-auto min-h-screen max-w-md rounded-3xl bg-gray-100 p-4 shadow-lg">
  <header class="mb-6 flex flex-row">
    <h1 class="text-2xl font-extrabold text-gray-900">Calculadora de Pontos</h1>
    <div class="ml-auto">
      <a href="/" aria-label="home">
        <button class="rounded-xl bg-gray-200 p-1" aria-label="home">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 11l9-8 9 8M4 10v10h6v-6h4v6h6V10" />
          </svg>
        </button>
      </a>
    </div>
  </header>

  <div class="grid grid-cols-6 justify-items-center gap-1 rounded-xl bg-[#35a291] py-2 text-white">
    <div class="col-span-1 uppercase"></div>
    <div class="col-span-4 uppercase">Jogadores</div>
    <div class="col-span-1 uppercase">
      <button aria-label="reset" onclick={() => reset()}>
        <svg class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.05 11a8 8 0 0114.9-2M20 4v5h-5M19.95 13a8 8 0 01-14.9 2M4 20v-5h5"
          />
        </svg>
      </button>
    </div>
    {#each [1, 2, 3, 4, 5, 6] as n}
      <button class="relative size-12" onclick={() => (player = n)}>
        <svg class="absolute inset-0 z-0 size-12" viewBox="0 0 117.92 131.58">
          <path
            id="ld"
            fill={colors[n]}
            stroke={player === n ? "white" : "none"}
            stroke-width="20"
            clip-path="url(#clip)"
            d="M58.96,131.08c-2.5,0-4.96-.66-7.13-1.91L7.63,103.65c-4.4-2.53-7.13-7.26-7.13-12.35v-51.03c0-5.08,2.73-9.81,7.13-12.35L51.83,2.41c2.17-1.25,4.63-1.91,7.13-1.91s4.96.66,7.13,1.91l44.31,25.58h0c4.33,2.55,7.01,7.24,7.01,12.28v51.03c0,5.08-2.73,9.81-7.13,12.35l-44.2,25.52c-2.17,1.25-4.63,1.91-7.13,1.91Z"
          />
          <clipPath id="clip">
            <use xlink:href="#ld" />
          </clipPath>
        </svg>
        <span class="relative z-10 font-bold">
          {calculate(captured[n])}
        </span>
      </button>
    {/each}
  </div>

  <div class="mt-2 rounded-xl bg-[#48c4b5] py-2">
    <div class="mb-5 flex flex-wrap justify-center gap-2 font-mono">
      {#each geekmons as geekmon}
        <button
          class={"text-md inline-flex cursor-pointer items-center rounded-full px-2.5 py-0.5 font-semibold transition-colors select-none " +
            (captured[player].includes(geekmon.number + ":s")
              ? "bg-violet-400"
              : captured[player].includes(geekmon.number)
                ? "bg-green-200"
                : "bg-white")}
          onclick={() => toggle(geekmon.number)}
        >
          {geekmon.number}
        </button>
      {/each}
    </div>

    <div class="flex flex-row flex-wrap justify-center gap-2">
      {#each captured[player].toSorted() as c (c)}
        {@const [n, ...flags] = c.split(":")}
        {@const shiny = flags.includes("s")}
        {@const point = pointMap(captured[player])[c]}

        <div class="mb-5 rounded-xl {shiny ? 'bg-purple-200' : 'bg-gray-200'} relative p-2 pb-5 text-center shadow-md">
          <img src={`/img/geekmons/${shiny ? "shiny/" : ""}${n}.png`} alt="" class="size-20" />
          <div class=" mx-auto -mb-7 w-[80%] rounded-xl bg-gray-200 text-center">{n}</div>

          <div class="absolute top-0 left-0 z-60 mx-auto flex h-full w-full items-center justify-center">
            <span
              class="flex size-15 items-center justify-center rounded-full text-2xl font-bold text-white {point > 0
                ? 'bg-green-950/70'
                : 'bg-red-800/70'} "
            >
              {point}
            </span>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
