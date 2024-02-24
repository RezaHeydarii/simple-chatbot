import { Suspense } from "react";
import { ChatPage } from "./pages";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import axios from "axios";

const queryClient = new QueryClient();
axios.defaults.baseURL = "http://localhost:4000";

function App() {
  return (
    <Suspense fallback={<p>loading</p>}>
      <QueryClientProvider client={queryClient}>
        <ChatPage />
      </QueryClientProvider>
    </Suspense>
  );
}

export default App;
