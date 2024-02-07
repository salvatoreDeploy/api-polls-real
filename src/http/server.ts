import fastify from 'fastify'
import { createPoll } from './routes/create-poll'
import { getDetailsPoll } from './routes/get-details-poll'
import { voteOnPoll } from './routes/vote-on-poll'
import cookie from '@fastify/cookie'

const app = fastify()

app.register(cookie, {
  secret: "poll-app-api",
  hook: 'onRequest',
  parseOptions: {}
})

app.register(createPoll)
app.register(getDetailsPoll)
app.register(voteOnPoll)

app.listen({port:3333}).then(() => {
  console.log('HTTP Server Running!')
})