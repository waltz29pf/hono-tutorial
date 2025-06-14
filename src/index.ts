import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";

const app = new Hono();

interface BlogPost {
	id: number;
	title: string;
	content: string;
}

// 仮のブログ記事データ
let blogPosts: BlogPost[] = [
	{
		id: 1,
		title: "ブログ記事1",
		content: "これはブログ記事1の内容です。",
	},
	{
		id: 2,
		title: "ブログ記事2",
		content: "これはブログ記事2の内容です。",
	},
	{
		id: 3,
		title: "ブログ記事3",
		content: "これはブログ記事3の内容です。",
	},
];

app.use("*", prettyJSON());

// ルート
app.get("/", (c) => {
	return c.text("Hello honou!!");
});

// ブログ記事一覧を取得する
app.get("/posts", (c) => {
	return c.json({ posts: blogPosts });
});

// 個別のブログ記事を取得する
app.get("/posts/:id", (c) => {
	const id = c.req.param("id");
	const post = blogPosts.find((p) => p.id === Number.parseInt(id));

	if (post) {
		return c.json({ title: post.title });
	}
	return c.json({ message: "記事が見つかりませんでした。" }, 404);
});

// ブログを作成する
app.post("/posts", async (c) => {
	const { title, content } = await c.req.json<{ title: string; content: string }>();
	const newPost = {
		id: blogPosts.length + 1,
		title,
		content,
	};
	blogPosts = [...blogPosts, newPost];
	return c.json({ post: newPost }, 201);
});

// ブログ記事を更新する
app.put("/posts/:id", async (c) => {
	const id = c.req.param("id");
	const index = blogPosts.findIndex((p) => p.id === Number.parseInt(id));
	if (index === -1) {
		return c.json({ message: "Post not found" }, 404);
	}

	const { title, content } = await c.req.json();
	blogPosts[index] = { ...blogPosts[index], title, content };

	return c.json(blogPosts[index]);
});

// ブログ記事を削除する
app.delete("/posts/:id", async (c) => {
	const id = c.req.param("id");
	const index = blogPosts.findIndex((p) => p.id === Number.parseInt(id));
	if (index === -1) {
		return c.json({ message: "Post not found" }, 404);
	}

	blogPosts = blogPosts.filter((p) => p.id !== Number.parseInt(id));

	return c.json({ message: "Post deleted" }, 204);
});

export default app;
