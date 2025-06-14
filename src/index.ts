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



export default app
