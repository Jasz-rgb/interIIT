import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { authModalState } from "../../../atoms/authModalAtom";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/firebase/errors";

const Login: React.FC = () => {
  const [modalState, setAuthModalState] = useRecoilState(authModalState);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const getUsernameForEmail = (email: string) => {
    const key = "usernames";
    const stored = JSON.parse(localStorage.getItem(key) || "{}");
    if (stored[email]) return stored[email];

    const namePart = email.split("@")[0];
    const randomStr = Math.random().toString(36).substring(2, 7);
    const username = `${namePart}_${randomStr}`;

    stored[email] = username;
    localStorage.setItem(key, JSON.stringify(stored));
    return username;
  };

  useEffect(() => {
    if (user?.user?.email) {
      const username = getUsernameForEmail(user.user.email);
      localStorage.setItem("currentUsername", username);
      localStorage.setItem("currentUserEmail", user.user.email);
    }
  }, [user]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInWithEmailAndPassword(loginForm.email, loginForm.password);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        required
        name="email"
        placeholder="Email"
        type="email"
        mb={2}
        onChange={onChange}
        value={loginForm.email}
      />
      <Input
        required
        name="password"
        placeholder="Password"
        type="password"
        mb={2}
        onChange={onChange}
        value={loginForm.password}
      />

      <Text textAlign="center" mt={2} fontSize="10pt" color="red">
        {error?.message ||
          FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
      </Text>

      <Button
        width="100%"
        height="36px"
        mt={2}
        mb={2}
        type="submit"
        isLoading={loading}
      >
        Log In
      </Button>

      <Flex justifyContent="center" mb={2}>
        <Text fontSize="9pt" mr={1}>
          Forgot your password?
        </Text>
        <Text
          fontSize="9pt"
          color="blue.500"
          cursor="pointer"
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "resetPassword",
            }))
          }
        >
          Reset
        </Text>
      </Flex>

      <Flex fontSize="9pt" justifyContent="center">
        <Text mr={1}>New here?</Text>
        <Text
          color="blue.500"
          fontWeight={700}
          cursor="pointer"
          onClick={() =>
            setAuthModalState((prev) => ({
              ...prev,
              view: "signup",
            }))
          }
        >
          SIGN UP
        </Text>
      </Flex>
    </form>
  );
};

export default Login;
