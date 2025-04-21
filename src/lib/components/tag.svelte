<script lang="ts">
  import type { Tag } from "$lib/geekmons";

  export let tag: Tag = "initial";

  const classes = {
    initial: "bg-[#b50000] text-white ",
    over: "bg-orange-500 text-white ",
    legendary: "bg-[#6399fe] text-white ",
    shiny: "bg-purple-600 text-white",
    corrupted: "bg-purple-800 text-white",
    purified: "bg-cyan-700 text-white",
    mythic: "bg-cyan-700 text-white",
    specter: "bg-violet-900",
  }[tag];

  const text = {
    initial: "♥  Inicial",
    legendary: "Lendário",
    over: "Crescimento Desenfreado",
    shiny: "☆ Luminoso",
    corrupted: "Corrompido",
    purified: "Purificado",
    mythic: "Mítico",
    specter: "Specter",
  }[tag];
</script>

<span
  class={`${classes} inline-flex items-center gap-2 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors select-none`}
  {...$$restProps}
>
  {text}
</span>
