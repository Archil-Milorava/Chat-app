import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

export default function App() {
  return (
    <div className="flex p-4 items-center justify-center w-full h-screen max-h-screen bg-cyan-700 backdrop:blur-sm">
      {/* <Login /> */}
      {/* <SignUp /> */}
      <Home />
    </div>
  );
}
