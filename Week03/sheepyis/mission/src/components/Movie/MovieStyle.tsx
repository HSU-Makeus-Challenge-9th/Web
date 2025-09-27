export const MovieRootContainer = `
  w-full h-full flex flex-col items-center
`;

export const MovieListContainer = `
  w-[95%] grid grid-cols-6 gap-6
`;

export const MovieItemContainer = `
    relative group w-full h-full cursor-pointer rounded-2xl
`;

export const MovieItemImg = `
    w-full h-full rounded-2xl bg-gray-400
`;

// MovieOverlay.tsx
export const MovieItemOverlayContainer = `
  absolute top-0 left-0 w-full h-full flex flex-col p-3
  bg-black/60 text-white
  opacity-0 group-hover:opacity-100
  transition duration-300
  overflow-hidden
  rounded-2xl
`;

export const MovieItemOverlayTitle = `
    text-[2rem] font-bold
`;

export const MovieItemOverlayP = `
    text-xs mt-1
    overflow-hidden text-ellipsis break-words
    [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]
`;
