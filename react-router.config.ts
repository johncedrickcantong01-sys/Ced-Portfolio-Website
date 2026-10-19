import type { Config } from "@react-router/dev/config";
import { work } from "./src/content/work";

// Every page is prerendered: home, /book and one case study per work.ts entry.
export default {
  appDirectory: "src",
  ssr: false,
  prerender: ["/", "/book", ...work.map((item) => `/work/${item.slug}`)],
} satisfies Config;
