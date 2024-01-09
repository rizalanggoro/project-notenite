type Failure = {
  message?: string;
  code?: number;
};

export default Failure;

// failure types
export const FailureTypes = {
  Server: 500,
  Authentication: {
    InvalidEmailOrPassword: 401,
    EmailAlreadyRegistered: 409,
  },
};

// failure messages
const AuthenticationMessage: { [key: number]: string } = {
  401: "Invalid email address or password! Please try again later",
  409: "Email already registered! Please try login or another one",
  500: "Something went wrong! Please try again later",
};

export const FailureMessages = { Authentication: AuthenticationMessage };
