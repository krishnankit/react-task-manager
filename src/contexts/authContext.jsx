import { useReducer, createContext, useContext, useEffect } from "react";
import authReducer from "../reducers/authReducer";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail
} from "firebase/auth";
import { AUTH_ACTIONS } from "../../constants";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthContextProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, { currentUser: null });

  async function signup(email, password, name) {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCred.user;
    await user.updateProfile({ displayName: name });

    // Reload the user to reflect displayName in onAuthStateChanged
    await auth.currentUser.reload();
  }

  function signin(email, password) {
    signInWithEmailAndPassword(auth, email, password);
  }

  function signout() {
    signOut(auth);
  }

  function updateEmail(email) {
    return auth.currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return auth.currentUser.updatePassword(password);
  }

  function updateName(name) {
    return auth.currentUser.updateProfile({
      displayName: name,
    });
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  // This keeps track of user sessions
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        localStorage.setItem("currentUser", user.displayName);
        dispatch({
          type: AUTH_ACTIONS.SIGNIN,
          payload: user,
        });
      } else {
        dispatch({
          type: AUTH_ACTIONS.SIGNOUT,
          payload: null,
        });
      }
    })

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser: state.currentUser,
        signin,
        signup,
        signout,
        updateEmail,
        updatePassword,
        resetPassword,
        updateName,
      }}
    >
      { children }
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;
