export const MovieRootContainer = `
  w-full h-full flex flex-col items-center mb-5
`;

export const MovieListContainer = `
  w-[95%] grid grid-cols-6 gap-2
`;

export const MovieItemContainer = `
    relative group w-full h-full cursor-pointer rounded-lg
`;

export const MovieItemImg = `
    w-full h-full rounded-lg bg-gray-400
`;

// MovieOverlay.tsx
export const MovieItemOverlayContainer = `
  absolute top-0 left-0 w-full h-full flex flex-col p-2
  bg-black/60 text-white
  opacity-0 group-hover:opacity-100
  transition duration-300
  overflow-hidden
  rounded-lg
`;

export const MovieItemOverlayTitle = `
  text-[1.2vw] font-bold line-clamp-1 break-words shrink-0
`;

export const MovieItemOverlayP = `
  text-[0.8vw] line-clamp-3 break-words
`;
