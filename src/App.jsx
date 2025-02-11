import Signup from "./auth/Signup"
import { useAuth } from "./contexts/authContext";

function App() {
  const { currentUser } = useAuth();
  return (
    <>
      { currentUser ?
      <h1>Home Page</h1>
      :
      <Signup />
      }
    </>
  )
}

export default App
