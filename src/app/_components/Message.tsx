/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";
import { content } from "tailwindcss/defaultTheme";
import CopyButton from "./Copy";
import SaveToFavoritesButton from "./Favorites"; // Adjust the path as necessary

const Message = (props: {
  message: {
    content: string | null;
    role: "user" | "system";
    userInput?: string; // Optional userInput for system messages
  };
}) => {
  const { message } = props;
  const { role, content: text, userInput } = message;

  const isUser = role === "user";

  return (
    <div
      className={`group w-full border-b border-black/10 text-gray-800 dark:border-gray-900/50 dark:text-gray-100 ${
        isUser ? "dark:bg-gray-800" : "bg-gray-50 dark:bg-[#444654]"
      }`}
    >
      <div className="m-auto flex w-full gap-4 text-base md:max-w-2xl md:gap-6 lg:max-w-xl lg:px-0 xl:max-w-3xl">
        <div className="m-auto flex w-full flex-row gap-4 p-4 md:max-w-2xl md:gap-6 md:py-6 lg:max-w-xl lg:px-0 xl:max-w-3xl">
          <div className="relative flex w-8 flex-col items-end">
            <div className="text-opacity-100r relative flex h-7 w-7 items-center justify-center rounded-sm bg-black/75 p-1 text-white">
              {isUser ? (
                <div className="i-heroicons-user h-4 w-4 text-white"></div>
              ) : (
                <div className="i-simple-icons-openai h-4 w-4 text-white"></div>
              )}
            </div>
            <div className="!invisible absolute left-0 top-2 -ml-4 flex -translate-x-full items-center justify-center gap-1 text-xs group-hover:visible">
              <button
                disabled
                className="text-gray-300 dark:text-gray-400"
              ></button>
              <span className="flex-shrink-0 flex-grow">1 / 1</span>
              <button
                disabled
                className="text-gray-300 dark:text-gray-400"
              ></button>
            </div>
          </div>
          <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
            <div className="flex flex-grow flex-col gap-3">
              <div className="flex min-h-20 flex-col items-start gap-4 whitespace-pre-wrap break-words">
                <div className="markdown prose dark:prose-invert dark w-full break-words">
                  {!isUser && text === null ? (
                    <div className="i-tabler-cursor-text h-6 w-6 animate-pulse"></div>
                  ) : (
                    <>
                      <p>{text}</p>
                      {/* Conditionally render the CopyButton for non-user (i.e., "system") messages */}
                      {/* {!isUser && text && <CopyButton content={text} />} */}
                      {!isUser && text && (
                        <>
                          <CopyButton content={text} />
                          <SaveToFavoritesButton
                            content={text}
                            role={role}
                            userInput={userInput}
                          />
                        </>
                      )}

                      <></>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
