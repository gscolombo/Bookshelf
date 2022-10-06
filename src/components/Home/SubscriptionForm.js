import { useState, useRef, useEffect } from "react";
import "../../styles/Home/Form.css";
import PasswordInput from "../PasswordInput";

export default function SubscriptionForm({
  post,
  setLoading,
  setForm,
  response,
  setErrors,
  errors,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCopy, setPasswordCopy] = useState("");
  const form = useRef();

  useEffect(() => {
    const msg = response.message;

    if (msg) {
      if (msg === "User already registered") {
        setErrors((obj) => ({ ...obj, email: "E-mail já cadastrado" }));
      }

      if (msg.startsWith("Error") || msg === "User registration failed!") {
        setErrors((obj) => ({
          ...obj,
          serverError:
            "Ocorreu um erro ao finalizar o cadastro. \n Por favor, entre em contato com contact.bookshelf.app@gmail.com",
        }));
      }
    }
  }, [response, setErrors]);

  function validateEmail() {
    const regexp = /[\w\d.]+@\w+\.com(?:.br)?/;

    if (!regexp.test(email)) {
      setErrors((obj) => ({ ...obj, email: "Insira um e-mail válido" }));
    }

    return regexp.test(email);
  }

  function validatePassword() {
    const inputPassword = new RegExp(password);

    if (password === "" && passwordCopy === "") {
      setErrors((obj) => ({
        ...obj,
        passwords: "Preencha os campos de senha",
      }));
      return false;
    }

    if (password === "") {
      setErrors((obj) => ({ ...obj, password: "Insira uma senha" }));
      return false;
    }

    if (passwordCopy === "") {
      setErrors((obj) => ({ ...obj, passwordCopy: "Confirme sua senha" }));
      return false;
    }

    if (!inputPassword.test(passwordCopy)) {
      setErrors((obj) => ({ ...obj, passwords: "Senhas não coincidem" }));
      return false;
    }

    return true;
  }

  async function handleSubscription() {
    setErrors({});

    const nameIsSet = name !== "";
    const validPassword = validatePassword();
    const validEmail = validateEmail();

    if (!nameIsSet) {
      setErrors((obj) => ({ ...obj, name: "Insira um nome" }));
    }

    if (nameIsSet && validEmail && validPassword) {
      const body = {
        name: name,
        email: email,
        password: password,
      };

      setLoading(true);
      post("http://localhost:81/api/users/register", body);
    }
  }

  return (
    <form className="subscription" ref={form}>
      <h1>Cadastre sua conta</h1>
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
        className={Object.keys(errors).includes("name") ? "invalid" : ""}
        type="text"
        name="name"
        id="name"
        value={name}
        onInput={(e) => setName(e.currentTarget.value)}
        placeholder="Nome"
      />
      <input
        className={Object.keys(errors).includes("email") ? "invalid" : ""}
        type="email"
        name="email"
        id="email"
        value={email}
        onInput={(e) => setEmail(e.currentTarget.value)}
        placeholder="E-mail"
      />
      <PasswordInput
        errorClass={
          Object.keys(errors).includes("passwords") ||
          Object.keys(errors).includes("password")
            ? "invalid"
            : ""
        }
        placeholder="Senha"
        setPassword={setPassword}
      />
      <PasswordInput
        errorClass={
          Object.keys(errors).includes("passwords") ||
          Object.keys(errors).includes("passwordCopy")
            ? "invalid"
            : ""
        }
        placeholder="Confirme a sua senha"
        id="confirm-password"
        setPassword={setPasswordCopy}
      />
      <button
        type="button"
        className="subscribe_button"
        onClick={handleSubscription}
      >
        Cadastrar
      </button>
      <button
        type="button"
        className="back_button"
        onClick={() => {
          form.current.classList.add("inactive");
          setTimeout(() => setForm("login"), 250);
        }}
      >
        Voltar
      </button>
    </form>
  );
}
