import { Hono } from "hono";
import { basicAuth } from "hono/basic-auth";
import { prettyJSON } from "hono/pretty-json";
import auth from "./auth/auth";
import posts from "./blogs/blogs";

const app = new Hono();

app.use("*", prettyJSON());

app.use(
	"/auth/*",
	basicAuth({
		username: "admin",
		password: "password",
	}),
);

app.route("/posts", posts);
app.route("/auth", auth);

// ルート
app.get("/", (c) => {
	return c.text("Hello honou!!");
});

export default app;
