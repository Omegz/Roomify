// "use client";
// import React from "react";
// import { Category } from "~/shared/Constants";
// import { selectedCategory } from "./Chat";
// import { computed } from "@preact/signals-react";
// import Link from "next/link";

// const setSelectedCategory = (event: React.FormEvent<HTMLDivElement>) => {
//   selectedCategory.value = (event.target as HTMLInputElement).value as Category;
// };

// const categoryOptions = computed(() => {
//   return Object.values(Category).map((category, i) => (
//     <div key={i} onChange={setSelectedCategory}>
//       <input
//         type="radio"
//         id={category.toString()}
//         name="category"
//         value={category.toString()}
//         className="hidden"
//       />
//       <label
//         className="flex-1 flex-col overflow-y-auto border-b border-white/20"
//         htmlFor={category.toString()}
//       >
//         <div className="flex flex-col gap-2 pb-2 text-sm text-gray-100">
//           <div
//             className={
//               "group relative flex cursor-pointer items-center gap-3 break-all rounded-md px-3 py-3 hover:bg-[#2A2B32] hover:pr-4 " +
//               (category.toString() === selectedCategory.value.toString()
//                 ? "bg-[#2A2B32]"
//                 : "")
//             }
//           >
//             <div className="i-lucide-message-square h-4 w-4"></div>
//             <div className="relative max-h-5 flex-1 overflow-hidden text-ellipsis break-all">
//               {category.toString()}
//               <div className="absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-gray-900 group-hover:from-[#2A2B32]"></div>
//             </div>
//           </div>
//         </div>
//       </label>
//     </div>
//   ));
// });

// const Sidebar = () => {
//   return (
//     <div className="scrollbar-trigger flex h-full w-full flex-1 items-start border-white/20">
//       <nav className="flex h-full flex-1 flex-col space-y-1 p-2">
//         <a
//           href="#"
//           onClick={(e) => {
//             e.preventDefault(); // Prevent the default anchor behavior
//             window.location.reload(); // Reload the page
//           }}
//           className="mb-1 flex flex-shrink-0 cursor-pointer items-center gap-3 rounded-md border border-white/20 px-3 py-3 text-sm text-white transition-colors duration-200 hover:bg-gray-500/10"
//         >
//           <div className="i-bi-plus-lg h-4 w-4"></div>
//           New chat
//         </a>
//         {/* <div className="flex-col flex-1 overflow-y-auto border-b border-white/20">
//           <div className="flex flex-col gap-2 pb-2 text-gray-100 text-sm">
//             <a className="flex py-3 px-3 items-center gap-3 relative rounded-md hover:bg-[#2A2B32] cursor-pointer break-all hover:pr-4 group">
//               <div className="i-lucide-message-square h-4 w-4" ></div>
//               <div className="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">
//                 New conversation
//                 <div className="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-gray-900 group-hover:from-[#2A2B32]"></div>
//               </div>
//             </a>
//           </div>
//         </div> */}
//         {categoryOptions}
//         <a
//           href="/library"
//           className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-3 text-sm text-white transition-colors duration-200 hover:bg-gray-500/10"
//         >
//           <div className="i-ant-design-message-outlined h-4 w-4"></div>
//           Saved Prompts
//         </a>

//         <a className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-3 text-sm text-white transition-colors duration-200 hover:bg-gray-500/10">
//           <div className="i-ant-design-user-outlined h-4 w-4"></div>
//           My plan
//         </a>

//         {/* <Link href="api/logout" className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
//           <div className="i-mdi-logout h-4 w-4"></div>
//           Log out
//         </Link> */}
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;
