import type { Config } from "@react-router/dev/config";

// The case-study slugs from src/content/work.ts join this list in T9,
// together with the /work/:slug route.
export default {
  appDirectory: "src",
  ssr: false,
  prerender: ["/", "/book"],
} satisfies Config;
