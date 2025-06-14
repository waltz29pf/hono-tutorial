import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";
import posts from "./blogs/blogs";

const app = new Hono();

app.use("*", prettyJSON());
app.route("/posts", posts);

// ルート
app.get("/", (c) => {
	return c.text("Hello honou!!");
});

export default app;
