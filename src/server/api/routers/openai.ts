import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const openAiRouter = createTRPCRouter({
  sendMessage: publicProcedure
    .input(z.object({
      messages: z.array(z.object({
        content: z.string().nullable(),
        role: z.enum(["user", "system"]),
      })),
      model: z.object({
        name: z.string(),
        id: z.string(),
        available: z.boolean(),
      })
    }))
    .mutation(({ input }) => {
      return {
        message: input.messages[input?.messages?.length - 1]?.content,
        role: "system"
      };
    })
});
