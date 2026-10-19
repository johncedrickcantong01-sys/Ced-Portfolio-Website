import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("book", "routes/book.tsx"),
  route("work/:slug", "routes/work.tsx"),
] satisfies RouteConfig;
