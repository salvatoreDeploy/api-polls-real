import z from "zod"
import { prisma } from "../../database/prisma"
import { FastifyInstance } from "fastify"
import { randomUUID } from "crypto"

export async function voteOnPoll(app: FastifyInstance) {
  app.post('/polls/:pollId/votes', async (request, reply) => {

    const voteOnPollBodySchema = z.object({
     pollOptionId: z.string().cuid()
    })

    const voteOnPollBodyParams = z.object({
     pollId: z.string().cuid()
    })

    const { pollOptionId } = voteOnPollBodySchema.parse(request.body)
    const { pollId } = voteOnPollBodyParams.parse(request.params)
    
    const sessionId = randomUUID()

    reply.setCookie('sessionId', sessionId, {
      path: '/',
      maxAge: 60 * 60 * 24 * 5, // 5 days
      signed: true,
      httpOnly: true
    })

    return reply.status(201).send()
  
  })
}