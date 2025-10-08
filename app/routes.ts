import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  route("episode/:slug", "./routes/episode.tsx"),
  route("login", "./routes/login.tsx"),
  route("new", "./routes/new.tsx"),
  // <Route path="teams/:teamId" element={<Team />} />
  // pattern ^           ^ module file
] satisfies RouteConfig;
