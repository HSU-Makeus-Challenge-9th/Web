import { UserDataDisplay } from './components/UserDataDisplay';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserDataDisplay />
    </QueryClientProvider>
  );
}