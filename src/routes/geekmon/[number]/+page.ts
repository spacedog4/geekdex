import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

import { geekmons } from "$lib/geekmons";

export const load: PageLoad = ({ params }) => {
  const idx = geekmons.findIndex((g) => g.number === params.number || g.name.toLowerCase() === params.number.toLowerCase());

  if (idx >= 0) {
    return {
      geekmon: geekmons[idx],
      idx,
    };
  }

  error(404, "Not found");
};
