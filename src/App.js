import { QueryClient, QueryClientProvider } from "react-query";
import TodoList from "./components/TodoList";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <TodoList />
    </QueryClientProvider>
  );
}

export default App;
