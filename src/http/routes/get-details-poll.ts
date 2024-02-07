import z from "zod"
import { prisma } from "../../database/prisma"
import { FastifyInstance } from "fastify"

export async function getDetailsPoll(app: FastifyInstance) {
  app.get('/polls/details/:pollOptionId', async (request, reply) => {

    const getPollParamsSchema = z.object({
      pollOptionId: z.string().cuid()
    })

    const { pollOptionId } = getPollParamsSchema.parse(request.params)
    

    const poll = await prisma.poll.findUnique({
      where: {
        id: pollOptionId
      },
      include: {
        options: {
          select: {
            id: true,
            title: true
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

    return reply.status(200).send({poll})
  
  })
}