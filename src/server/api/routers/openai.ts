/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { makeLouisRequest } from "../controllers/louis";
import { Category, Model } from "~/shared/Constants";
import { db } from "~/server/db";

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
    }),

    saveToFavorites: protectedProcedure
    .input(z.object({
      content: z.string(),
      role: z.enum(["user", "system"]),
      userId: z.string().optional(), // Include this if you're associating favorites with users
    }))
    .mutation(async ({ input, ctx }) => {
      // Implementation for saving the message as a favorite
      const savedFavorite = await db.favorite.create({
        data: {
          content: input.content,
          // role: input.role,
          userId: input.userId, // Associate with a user if userId is provided
        },
      });
  
      return savedFavorite;
    }),
  
});
