import { type JSX } from "react";
import "./App.css";
//import { useCustomFetch } from "./hooks/useCustomFetch";
//import type { User } from "./types/User";
import { WelcomeData } from "./components/UserDataDisplay";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App(): JSX.Element {
  /* const { data, isPending, isError } = useCustomFetch<User>(
    "https://jsonplaceholder.typicode.com/users/1"
  );

  console.log(isPending);

  if (isError) {
    return <div>에러가 발생했습니다ㅠㅠ</div>;
  }

  if (isPending) {
    return <div>로딩중. . .</div>;
  }
 */
  return (
    <>
      {/* <h1>Tanstack Query</h1>
      {JSON.stringify(data)}
      <p>이름: {data?.name}</p> */}
      <QueryClientProvider client={queryClient}>
        <WelcomeData />
      </QueryClientProvider>
    </>
  );
}

export default App;
