import { useState, useRef, useEffect } from "react";
import "../../styles/Home/Form.css";

export default function ForgotPasswordForm({
  setForm,
  setLoading,
  post,
  response,
  setErrors,
  errors,
}) {
  const [email, setEmail] = useState("");
  const [showStatus, setShowStatus] = useState("none");
  const form = useRef();

  useEffect(() => {
    const msg = response.message;

    if (msg) {
      if (!msg.startsWith("Message sent successfully to ")) {
        response.message === "User not found"
          ? setErrors((obj) => ({ ...obj, email: "E-mail não cadastrado" }))
          : setErrors((obj) => ({
              ...obj,
              email:
                "Erro ao enviar e-mail. Por favor, entre em contato com contact.bookshelf.api@gmail.com",
            }));
      } else {
        setShowStatus("block");
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

  function handleEmailSending() {
    setErrors({});
    const validEmail = validateEmail();

    if (validEmail) {
      const body = {
        email: email,
      };

      setLoading(true);
      post("http://localhost:81/api/users/forgot_password", body);
    }
  }

  return (
    <form className="forgot_password" ref={form}>
      <h1>Recupere sua senha</h1>
      <p>Insira o e-mail usado no cadastro da sua conta.</p>
      <p>
        {" "}
        Você irá receber uma mensagem no seu e-mail para trocar a sua senha.
      </p>
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
        <p
          style={{
            display: showStatus,
            color: "green",
            textShadow: "0 0 10px green",
          }}
        >
          E-mail enviado com sucesso! <br />
          Verifique sua caixa de entrada
        </p>
      </div>
      <input
        className={Object.keys(errors).includes("email") ? "invalid" : ""}
        type="email"
        name="email"
        id="email"
        placeholder="E-mail"
        value={email}
        onInput={(e) => setEmail(e.currentTarget.value)}
      />
      <button
        type="button"
        className="forgot_password_button"
        onClick={handleEmailSending}
      >
        Enviar
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
