import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json'

const app = new Hono()

// 仮のブログ記事データ
let blogPosts = [
  {
    id: 1,
    title: 'ブログ記事1',
    content: 'これはブログ記事1の内容です。',
  },
  {
    id: 2,
    title: 'ブログ記事2',
    content: 'これはブログ記事2の内容です。',
  },
  {
    id: 3,
    title: 'ブログ記事3',
    content: 'これはブログ記事3の内容です。',
  },
]

app.use('*', prettyJSON())

// ルート
app.get('/', (c) => {
  return c.text('Hello honou!!')
})

// ブログ記事一覧を取得する
app.get('/posts', (c) => {
  return c.json({posts:blogPosts})
})


// 個別のブログ記事を取得する
app.get("/posts/:id", (c)=>{
  const id = c.req.param('id')
  const post = blogPosts.find((p) => p.id === parseInt(id))

  if(post) {
    return c.json({title:post.title})
  }else {
    return c.json({message: '記事が見つかりませんでした。'}, 404)
  }

})

export default app
