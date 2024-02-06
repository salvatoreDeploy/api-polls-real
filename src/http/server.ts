import { PrismaClient } from '@prisma/client'
import fastify from 'fastify'
import z from 'zod'

const app = fastify()

const prisma = new PrismaClient()

app.post('/polls', async (request, reply) => {

  const createPollBodySchema = z.object({
    title: z.string()
  })

  const { title } = createPollBodySchema.parse(request.body)
  

  const poll = await prisma.poll.create({
    data: {
      title
    }
  })

  return reply.status(201).send({pollId: poll.id})
  
})

app.listen({port:3333}).then(() => {
  console.log('HTTP Server Running!')
})