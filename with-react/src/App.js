import './App.css';
import { Topbar } from './components/Topbar';
import { PokeList } from './components/PokeList';
import { Bottombar } from './components/Bottombar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Topbar />
      <PokeList />
      <Bottombar />
    </QueryClientProvider>
  );
}

export default App;
