/* eslint-disable default-case */
import { useState, useEffect, useRef } from "react";
import PasswordInput from "../PasswordInput";
import "../../styles/Home/Form.css";

export default function LoginForm({
  setLoading,
  setForm,
  post,
  response,
  setErrors,
  errors,
}) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const form = useRef();

  useEffect(() => {
    switch (response.error) {
      case "User not found":
        setErrors((obj) => ({ ...obj, user: "Usuário não cadastrado" }));
        break;
      case "Incorrect password":
        setErrors((obj) => ({ ...obj, password: "Senha incorreta" }));
        break;
    }
  }, [response, setErrors]);

  function validateEmail() {
    const regexp = /[\w\d.]+@\w+\.com(?:.br)?/;

    if (!regexp.test(user)) {
      setErrors((obj) => ({ ...obj, user: "Insira um e-mail válido" }));
    }

    return regexp.test(user);
  }

  async function handleLogin() {
    setErrors({});
    const type = user.includes("@") ? "email" : "name";
    const validPassword = password !== "";

    let validUser;
    if (type === "email") {
      validUser = validateEmail();
    } else {
      if (user === "") {
        setErrors((obj) => ({ ...obj, user: "Insira o usuario" }));
      } else {
        validUser = user;
      }
    }

    if (!validPassword) {
      setErrors((obj) => ({ ...obj, password: "Insira a senha" }));
    }

    if (validUser && validPassword) {
      const body = {
        [type]: user,
        password: password,
      };

      setLoading(true);
      post("http://localhost:81/api/users/login", body);
    }
  }

  return (
    <form className="login" ref={form}>
      <h1>Acesse sua conta</h1>
      <div>
        {Object.keys(errors).map((key) => (
          <p
            style={{
              marginTop: "10px",
              textAlign: "center",
              color: "red",
              fontFamily: "var(--sec-font)",
            }}
            key={key}
          >
            {errors[key]}
          </p>
        ))}
      </div>
      <input
        className={Object.keys(errors).includes("user") ? "invalid" : ""}
        type="text"
        name="user"
        id="user"
        placeholder="Usuário/E-mail"
        value={user}
        onInput={(e) => {
          setUser(e.currentTarget.value);
        }}
      />
      <PasswordInput
        errorClass={Object.keys(errors).includes("password") ? "invalid" : ""}
        placeholder="Senha"
        setPassword={setPassword}
      />
      <button
        className="forgot_password_button"
        type="button"
        onClick={() => {
          form.current.classList.add("inactive");
          setTimeout(() => setForm("forgotPassword"), 250);
        }}
      >
        Esqueci minha senha
      </button>
      <button className="login_button" type="button" onClick={handleLogin}>
        Entrar
      </button>
      <button
        className="subscribe_button"
        type="button"
        onClick={() => {
          form.current.classList.add("inactive");
          setTimeout(() => setForm("subscription"), 250);
        }}
      >
        Faça sua conta
      </button>
    </form>
  );
}
