import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { makeLouisRequest } from "../controllers/louis";
import { Category } from "~/shared/Constants";

export const openAiRouter = createTRPCRouter({
  sendMessage: protectedProcedure
    .input(z.object({
      messages: z.array(z.object({
        content: z.string().nullable(),
        role: z.enum(["user", "system"]),
      })),
      model: z.object({
        name: z.string(),
        id: z.string(),
        available: z.boolean(),
      }),
      selectedCategory: z.nativeEnum(Category),
    }))
    .mutation(async ({ input }) => {
      const question = input.messages[input?.messages?.length - 1]?.content ?? ""
      const louisResponse = await makeLouisRequest(question, input.selectedCategory)
      const louisMessage = louisResponse?.body.responseContent
      // const louisMessage = input.selectedCategory
      return {
        message: louisMessage,
        role: "system"
      };
    })
});
