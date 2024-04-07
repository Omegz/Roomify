// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// "use client";
// import { createRef, type KeyboardEvent, type MouseEvent } from "react";
// import Message from "./Message";
// import { Category, DEFAULT_OPENAI_MODEL, Model } from "~/shared/Constants";
// import { computed, signal, effect } from "@preact/signals-react";
// import { client } from "~/trpc/react";
// import { mobileSidebarVisible } from "./MobileSidebar";

// export const selectedCategory = signal(Category.Other);
// export const selectedModel = signal(Model.Other); // Assuming Model.DEFAULT is a valid default model
// const modelOptions = Object.values(Model).map((modelKey) => (
//   <option key={modelKey} value={modelKey}>
//     {modelKey}
//   </option>
// ));

// const lastSentMessage = signal(""); // Initialize a signal to store the last sent user message

// const handleModelChange = (event) => {
//   selectedModel.value = Model[event.target.value];
// };

// const isLoading = signal(false);

// const message = signal("");
// const messageEmpty = computed(() => message.value.length === 0);

// const errorMessage = signal("");
// const errorMessageContainer = computed(() =>
//   errorMessage.value ? (
//     <div className="mb-2 md:mb-0">
//       <div className="ml-1 flex h-full justify-center gap-0 md:m-auto md:mb-2 md:w-full md:gap-2">
//         <span className="text-sm text-red-500">{errorMessage}</span>
//       </div>
//     </div>
//   ) : null,
// );

// const showEmptyChat = signal(true);

// const conversation = signal<
//   { content: string | null; role: "user" | "system"; userInput?: string }[]
// >([]);

// const conversationEmpty = computed(() => conversation.value.length === 0);
// const conversationMessages = computed(() =>
//   conversation.value.map((msg, index) => (
//     <Message
//       key={index}
//       message={msg}
//       userInput={msg.role === "system" ? msg.userInput : undefined} // Pass userInput only for system messages
//     />
//   )),
// );

// const conversationContainer = computed(() =>
//   !showEmptyChat.value && !conversationEmpty.value ? (
//     <div className="flex flex-col items-center text-sm">
//       <div className="flex w-full items-center justify-center gap-1 border-b border-black/10   p-3 text-gray-500 dark:border-gray-900/50 dark:bg-gray-700 dark:text-gray-300">
//         Model: {selectedModel.value}
//       </div>
//       {conversationMessages}

//       <div className="h-32 w-full flex-shrink-0  md:h-48"></div>
//       <div ref={bottomOfChatRef}></div>
//     </div>
//   ) : (
//     <div className="relative flex h-full w-full flex-col py-10">
//       <div className="flex items-center justify-center gap-2">
//         {/* <div className="relative w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
//           <button
//             className="align-center relative flex w-full cursor-default flex-col rounded-md border border-black/10 bg-white py-2 pl-3 pr-10 text-left focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 sm:text-sm dark:border-white/20 dark:bg-gray-800"
//             id="headlessui-listbox-button-:r0:"
//             type="button"
//             aria-haspopup="true"
//             aria-expanded="false"
//             data-headlessui-state=""
//             aria-labelledby="headlessui-listbox-label-:r1: headlessui-listbox-button-:r0:"
//           >
//             <label
//               className="block text-center text-xs text-gray-700 dark:text-gray-500"
//               id="headlessui-listbox-label-:r1:"
//               data-headlessui-state=""
//             >
//               Model
//             </label>
//             <span className="inline-flex w-full truncate">
//               <span className="flex h-6 items-center gap-1 truncate text-white">
//                 {selectedModel.name}
//               </span>
//             </span>
//             <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
//               <div className="i-bi-chevron-down h-4 w-4 text-gray-400"></div>
//             </span>
//           </button>
//         </div> */}

//         <div className="relative w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
//           <select
//             onChange={handleModelChange}
//             value={selectedModel.value}
//             className="mb-4 w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-base shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
//           >
//             {modelOptions}
//           </select>
//         </div>
//       </div>
//       <h1 className="flex h-screen items-center justify-center gap-2 text-center text-2xl font-semibold text-gray-200 sm:text-4xl dark:text-gray-600">
//         Louis Gpt
//       </h1>
//     </div>
//   ),
// );

// const sendMessageButton = computed(() => (
//   <button
//     disabled={isLoading.value || messageEmpty.value}
//     onClick={sendMessage}
//     className="absolute bottom-1.5 right-1 rounded-md bg-transparent p-1 disabled:bg-gray-500 disabled:opacity-40 md:bottom-2.5 md:right-2"
//   >
//     <div className="i-material-symbols-send-rounded mr-1 h-4 w-4 text-white"></div>
//   </button>
// ));

// const sendMessage = async (
//   e:
//     | KeyboardEvent<HTMLTextAreaElement>
//     | MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
// ) => {
//   e.preventDefault();
//   // Don't send empty messages
//   if (messageEmpty.value) {
//     errorMessage.value = "Please enter a message.";
//     return;
//   } else {
//     errorMessage.value = "";
//   }

//   // trackEvent("send.message", { message: message });
//   isLoading.value = true;
//   lastSentMessage.value = message.value; // Store the current message as the last sent message

//   // Add the message to the conversation
//   // cleared previous chat
//   conversation.value = [
//     // ...conversation.value,
//     { content: message.value, role: "user" },
//   ];

//   // Clear the message & remove empty chat
//   message.value = "";
//   showEmptyChat.value = false;

//   try {
//     const response = await client.openai.sendMessage.mutate({
//       messages: conversation.value,
//       model: selectedModel.value, // Now including the selected model
//       selectedCategory: selectedCategory.value,
//     });

//     if (response?.message) {
//       // Add the message to the conversation
//       conversation.value = [
//         ...conversation.value,
//         {
//           content: response?.message ?? "",
//           role: "system",
//           userInput: lastSentMessage.value,
//         },
//       ];
//     }

//     // if (response?.message) {
//     //   // Add the message to the conversation
//     //   conversation.value = [
//     //     ...conversation.value,
//     //     { content: message.value, role: "user" }, // User's message
//     //     // Assume systemResponse is the response received after sending the message
//     //     { content: systemResponse, role: "system", userInput: message.value }, // System's response with userInput
//     //   ];
//     // }

//     isLoading.value = false;
//   } catch (error) {
//     const errors = JSON.parse((error as { message: string })?.message ?? "") as
//       | { message: string }[]
//       | undefined;
//     errors?.forEach((error) => {
//       console.log(error.message);
//       errorMessage.value = error.message;
//     });
//   }
// };

// const bottomOfChatRef = createRef<HTMLDivElement>();
// const textAreaRef = createRef<HTMLTextAreaElement>();

// effect(() => {
//   message.value;
//   if (textAreaRef.current) {
//     textAreaRef.current.style.height = "24px";
//     textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
//   }
// });

// effect(() => {
//   conversation.value;
//   if (bottomOfChatRef.current) {
//     bottomOfChatRef.current.scrollIntoView({ behavior: "smooth" });
//   }
// });

// const handleKeypress = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
//   // It's triggers by pressing the enter key
//   if (e.key === "Enter" && !e.shiftKey) {
//     e.preventDefault();
//     await sendMessage(e);
//   }
// };

// const textArea = computed(() => (
//   <textarea
//     ref={textAreaRef}
//     tabIndex={0}
//     data-id="root"
//     style={{
//       height: "24px",
//       maxHeight: "200px",
//       overflowY: "hidden",
//     }}
//     // rows={1}
//     placeholder="Send a message..."
//     className="m-0 w-full resize-none border-0 bg-transparent p-0 pl-2 pr-7 focus:ring-0 focus-visible:ring-0 md:pl-0 dark:bg-transparent"
//     onKeyDown={handleKeypress}
//     value={message.value}
//     onInput={(event) => (message.value = event.currentTarget.value)}
//   ></textarea>
// ));

// const Chat = () => {
//   // const { trackEvent } = useAnalytics();

//   return (
//     <div className="flex max-w-full flex-1 flex-col">
//       <div className="sticky top-0 z-10 flex items-center border-b border-white/20 pl-1 pt-1 text-gray-200 sm:pl-3 md:hidden">
//         <button
//           type="button"
//           className="-ml-0.5 -mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white dark:hover:text-white"
//           onClick={() => {
//             mobileSidebarVisible.value = !mobileSidebarVisible.value;
//           }}
//         >
//           <span className="sr-only">Open sidebar</span>
//           <div className="i-radix-icons-hamburger-menu h-6 w-6 text-white"></div>
//         </button>
//         <h1 className="flex-1 text-center text-base font-normal">New chat</h1>
//         <button type="button" className="px-3">
//           <div className="i-bi-plus-lg h-6 w-6"></div>
//         </button>
//       </div>
//       <div className="flex min-h-0 flex-1 overflow-hidden">
//         <div className="flex flex-1 flex-col">
//           {/* Chat content container */}
//           <div className="flex-1 overflow-y-auto">
//             <div className="react-scroll-to-bottom--css-ikyem-79elbk h-full dark:bg-gray-800">
//               {conversationContainer}
//             </div>
//           </div>
//           {/* Input area */}
//           <div className="border-t bg-white pt-2 md:border-t-0 md:border-transparent md:!bg-transparent dark:border-white/20 dark:bg-gray-800 md:dark:border-transparent dark:md:bg-vert-dark-gradient">
//             <form className="mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
//               <div className="flex w-full flex-col">
//                 {errorMessageContainer}
//                 <div className="relative flex w-full flex-grow flex-col rounded-md border border-black/10 bg-white py-2 shadow-[0_0_10px_rgba(0,0,0,0.10)] md:py-3 md:pl-4 dark:border-gray-900/50 dark:bg-gray-700 dark:text-white dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]">
//                   {textArea}
//                   {sendMessageButton}
//                 </div>
//               </div>
//             </form>
//             <div className="px-3 pb-3 pt-2 text-center text-xs text-black/50 md:px-4 md:pb-6 md:pt-3 dark:text-white/50">
//               <span>
//                 ChatGPT Clone may produce inaccurate information about people,
//                 places, or facts.
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;
