import z from "zod"
import { prisma } from "../../database/prisma"
import { FastifyInstance } from "fastify"

export async function createPoll(app: FastifyInstance) {
  app.post('/polls', async (request, reply) => {

    const createPollBodySchema = z.object({
      title: z.string(),
      options: z.array(z.string())
    })

    const { title, options } = createPollBodySchema.parse(request.body)
    

    const poll = await prisma.poll.create({
      data: {
        title,
        options: {
          createMany: {
            data: options.map(option => {
              return {title:option}
            })
          }
        }
      }
    })

    /* 
      await prisma.pollOption.createMany({
        data: options.map(option => {
          return {
            title: option,
            pollOptionId: poll.id
          }
        })
      }) 
    */

    return reply.status(201).send({pollId: poll.id})
  
  })
}