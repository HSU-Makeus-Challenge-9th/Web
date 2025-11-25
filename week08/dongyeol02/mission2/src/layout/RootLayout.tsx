// src/layouts/RootLayout.tsx (수정)

import { AuthProvider } from "../Context/AuthContext";
import { SidebarProvider } from "../Context/SidebarContext";
import RootLayoutContent from "./RootLayoutContent";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const RootLayout = () => {
  return (
    <AuthProvider>
      <SidebarProvider>
        <QueryClientProvider client={queryClient}>
          <RootLayoutContent />
        </QueryClientProvider>
      </SidebarProvider>
    </AuthProvider>
  );
};

export default RootLayout;
