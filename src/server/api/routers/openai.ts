import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { makeLouisRequest } from "../controllers/louis";
import { Category, Model } from "~/shared/Constants";

export const openAiRouter = createTRPCRouter({
  sendMessage: protectedProcedure
    .input(z.object({
      messages: z.array(z.object({
        content: z.string().nullable(),
        role: z.enum(["user", "system"]),
      })),
      model: z.nativeEnum(Model),
      
      selectedCategory: z.nativeEnum(Category),
    }))
    .mutation(async ({ input }) => {
      const question = input.messages[input?.messages?.length - 1]?.content ?? ""
      const louisResponse = await makeLouisRequest(question, input.selectedCategory, input.model)
      const louisMessage = louisResponse?.body.responseContent
      // const louisMessage = input.selectedCategory
      return {
        message: louisMessage,
        role: "system"
      };
    })
});
