import { AUTH_ACTIONS } from "../../constants";

export default function authReducer(state, { type, payload }) {
  switch(type) {
    case AUTH_ACTIONS.SIGNIN: {
      return {
        currentUser: payload.user,
      }
    }
    case AUTH_ACTIONS.SIGNOUT: {
      return {
        currentUser: null,
      }
    }
    default: {
      return state;
    }
  }
}
