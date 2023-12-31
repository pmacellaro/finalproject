import React, { useState } from "react";
import { useHistory} from "react-router-dom";
import styled from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";

function Signup({ updateUser }) {
  const [signUp, setSignUp] = useState(false);
  const history = useHistory();

  const handleClick = () => setSignUp((signUp) => !signUp);

  const formSchema = yup.object().shape({
    name: yup.string().required("Please enter a name."),
    email: yup.string().email(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      email: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch(signUp ? "/users" : "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((resp) => {
        if (resp.ok) {
          resp.json().then((user) => {
            updateUser(user);
            history.push("/");
          });
        } else {
          console.log("handle errors!!");
        }
      });
    },
  });

  return (
    <>
      <h2>Please Log in or Sign up!</h2>
      <button onClick={handleClick}>
        {signUp ? "Log In!" : "Register now!"}
      </button>
      <Form onSubmit={formik.handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <label>password</label>
        <input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {signUp && (
          <>
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </>
        )}
        <input type="submit" value={signUp ? "Sign Up!" : "Log In!"} />
      </Form>
    </>
  );
}

export default Signup;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  margin: auto;
  font-family: Arial;
  font-size: 30px;
  input[type="submit"] {
    background-color: #42ddf5;
    color: white;
    height: 40px;
    font-family: Arial;
    font-size: 30px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;