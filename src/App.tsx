import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './App.css';
import Pokemon from './components/Pokemon';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

const App = (): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <Pokemon />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;