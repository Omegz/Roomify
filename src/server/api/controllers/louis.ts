/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
// import { error, json } from '@sveltejs/kit';
// import { MistralAIEmbeddings } from "@langchain/mistralai"; // Ensure this is the correct import path
import { ChatMistralAI } from "@langchain/mistralai";
import { PromptTemplate } from "@langchain/core/prompts"
import { StringOutputParser } from '@langchain/core/output_parsers'
import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables"



import { env } from '~/env';
import { Category, type Model } from "~/shared/Constants";


// Initialize your ChatMistralAI and other components with the apiKey
const llm = new ChatMistralAI({ apiKey: env.MISTRAL_AI_SECRET });

// Templates and chain setup
const standaloneQuestionTemplate = 'Given a question, convert it to a standalone question. question: {question} standalone question:';
const standaloneQuestionPrompt = PromptTemplate.fromTemplate(standaloneQuestionTemplate);

export const makeLouisRequest = async (question: string, selectedCategory: Category,  selectedModel: Model) => {
  try {
    // Define a function to select the template based on the category
    const answerTemplate = getTemplateForCategoryAndModel(selectedCategory, selectedModel);

    // Initialize the prompt with the selected answer template
    const answerPrompt = PromptTemplate.fromTemplate(answerTemplate);

    // Reconfigure the chain with the updated answer prompt
    const chain = RunnableSequence.from([
      {
        standalone_question: standaloneQuestionPrompt.pipe(llm).pipe(new StringOutputParser()),
        original_input: new RunnablePassthrough()
      },
      {
        context: ({ original_input }) => original_input.question,
        question: ({ original_input }) => original_input.question
      },
      answerPrompt.pipe(llm).pipe(new StringOutputParser())
    ]);

    // Invoke the chain with the question to get the response
    const responseContent = await chain.invoke({ question });

    return {
      status: 200,
      body: {
        message: "Query processed successfully.",
        responseContent // Directly passing the response content
      }
    };
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error processing question:", err);
      return {
        status: 500,
        body: {
          error: `Failed to process question: ${err?.message || 'Unknown error'}`,
        }
      };
    }
  }
}


// Helper function to select the template based on category
function getTemplateForCategoryAndModel(selectedCategory, selectedModel) {
  // Create a composite key combining category and model
  const key = `${selectedCategory}_${selectedModel}`;

  // Use the composite key in a switch statement for detailed control
  switch (key) {
    // Marketing category examples
    case `${Category.Marketing}_Standard`:
      return `As a knowledgeable and insightful guide across a wide range of subjects, your role is not to provide direct answers but to refine and rephrase any question you're given.
      This ensures the question is perfectly tailored for a deep understanding, making it ideal for further exploration or expert analysis.
     For every question presented, enhance its structure, specificity, or context to improve its potential for an insightful response when eventually addressed by an expert.
      Remember, your goal is to enrich the question, making it clearer and more precise. 
      If a question is already well-formed, consider how it might be expanded to elicit more detailed insights. 
      Always approach this task with creativity and a commitment to fostering curiosity and understanding. Always RE-formulate the question 
      so that when someone is an expert at a craft, begin by saying, Act as the king of marketing, then reformulated question directly here. Your only Output should be the reformulated question. 
      No explanations. 
     context: {context}
     question: {question}
     answer:`;
    case `${Category.Marketing}_Contextual`:
      return `As a knowledgeable and insightful guide across a wide range of subjects, your role is not to provide direct answers but to refine and rephrase any question you're given.
      This ensures the question is perfectly tailored for a deep understanding, making it ideal for further exploration or expert analysis.
     For every question presented, enhance its structure, specificity, or context to improve its potential for an insightful response when eventually addressed by an expert.
      Remember, your goal is to enrich the question, making it clearer and more precise. 
      If a question is already well-formed, consider how it might be expanded to elicit more detailed insights. 
      Always approach this task with creativity and a commitment to fostering curiosity and understanding. Always RE-formulate the question 
      so that when someone is an expert at a craft, begin by saying, Act as the Queen of marketing, then reformulated question directly here. Your only Output should be the reformulated question. 
      No explanations. 
     context: {context}
     question: {question}
     answer:`;

    // Image category examples
    case `${Category.Image}_BasicModel`:
      return `Template for Basic Image Model: ...`;
    case `${Category.Image}_AdvancedModel`:
      return `Template for Advanced Image Model: ...`;

    // Code category examples
    case `${Category.Code}_BasicModel`:
      return `Template for Basic Coding Model: Explore basic programming concepts and simplify coding questions.`;
    case `${Category.Code}_AdvancedModel`:
      return `Template for Advanced Coding Model: Dive deep into complex algorithms and software architecture.`;

    // Math category examples
    case `${Category.Math}_BasicModel`:
      return `Template for Basic Math Model: Focus on elementary mathematical problems and arithmetic.`;
    case `${Category.Math}_AdvancedModel`:
      return `Template for Advanced Math Model: Challenge with advanced mathematical theories and proofs.`;

    // Science category examples
    case `${Category.Science}_BasicModel`:
      return `Template for Basic Science Model: Cover fundamental science questions, suitable for a broad audience.`;
    case `${Category.Science}_AdvancedModel`:
      return `Template for Advanced Science Model: Engage with intricate scientific discussions and detailed explorations.`;

    // Default case for each category without specific model differentiation
    // These can be general templates that apply when no specific model is matched
    case Category.Marketing:
      return `As a knowledgeable and insightful guide across a wide range of subjects, your role is not to provide direct answers but to refine and rephrase any question you're given.
      This ensures the question is perfectly tailored for a deep understanding, making it ideal for further exploration or expert analysis.
     For every question presented, enhance its structure, specificity, or context to improve its potential for an insightful response when eventually addressed by an expert.
      Remember, your goal is to enrich the question, making it clearer and more precise. 
      If a question is already well-formed, consider how it might be expanded to elicit more detailed insights. 
      Always approach this task with creativity and a commitment to fostering curiosity and understanding. Always RE-formulate the question 
      so that when someone is an expert at a craft, begin by saying, Act as the king of marketing, then reformulated question directly here. Your only Output should be the reformulated question. 
      No explanations. 
     context: {context}
     question: {question}
     answer:`;
    case Category.Image:
      return `General Image Template: ...`;
    case Category.Code:
      return `General Coding Template: ...`;
    case Category.Math:
      return `General Math Template: ...`;
    case Category.Science:
      return `General Science Template: ...`;
    // Default fallback for any other combinations
    default:
      return `Fallback Template: This template serves as a generic response for any unmatched category or model combination.`;
  }
}

