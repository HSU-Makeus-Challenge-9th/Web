import { RouterProvider } from "react-router-dom";
import GlobalStyle from "./styles/globalStyles";
import router from "./routes/router";
import { TodosProvider } from "./hooks/todo/TodosProvider";

function App() {
  return (
    <>
      <GlobalStyle />
      <TodosProvider>
        <RouterProvider router={router} />
      </TodosProvider>
    </>
  );
}

export default App;
