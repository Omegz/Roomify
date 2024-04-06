import type { OpenAIModel } from "~/types/Model";

export const LS_UUID = "@ls/uuid";

export const DEFAULT_OPENAI_MODEL = {
  name: "Default (GPT-3.5)",
  id: "gpt-3.5-turbo",
  available: true,
};

export const GPT4_OPENAI_MODEL = {
  name: "GPT-4",
  id: "gpt-4",
  available: false,
};

export const OPENAI_MODELS: OpenAIModel[] = [
  DEFAULT_OPENAI_MODEL,
  GPT4_OPENAI_MODEL,
];

export enum Category {
  Marketing = "Marketing",
  Image = "Image",
  Code = "Code",
  Math = "Math",
  Science = "Science",
  History = "History",
  Writer = "Writer",

  Other = "Other",
}

export enum Model {
  Standard = "Standard",
  Contextual = "Contextual",
  Other = "Other",
}