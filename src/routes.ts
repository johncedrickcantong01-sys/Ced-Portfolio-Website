import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("fallback", "routes/fallback.tsx"),
] satisfies RouteConfig;
