import type { Config } from "@react-router/dev/config";

// Every page is prerendered: home and /book.
export default {
  appDirectory: "src",
  ssr: false,
  prerender: ["/", "/book"],
} satisfies Config;
