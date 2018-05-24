'use strict'

const { test, trait } = use('Test/Suite')('Post')
const Post = use('App/Models/Post')

trait('Test/ApiClient')

test('get list of posts', async ({ client }) => {
  await Post.create({
    title: 'Adonis 101',
    body: 'Blog post content'
  })

  const response = await client.get('/posts').end()

  response.assertStatus(200)
  response.assertJSONSubset([{
    title: 'Adonis 101',
    body: 'Blog post content'
  }])
})
