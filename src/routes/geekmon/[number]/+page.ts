import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

import { geekmons } from "$lib/geekmons";

export const load: PageLoad = ({ params }) => {
  const geekmon = geekmons.find((g) => g.number === params.number || g.name.toLowerCase() === params.number.toLowerCase());

  if (geekmon) {
    return {
      geekmon,
    };
  }

  error(404, "Not found");
};
