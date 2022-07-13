import { useState } from "react";
import eye from "../img/eye.svg";
import eyeOff from "../img/eye-off.svg";

export default function PasswordInput({
  setPassword,
  placeholder,
  id = "password",
  errorClass,
}) {
  const [inputType, setInputType] = useState("password");

  return (
    <div
      className="password-input-container"
      style={{
        display: "flex",
        minWidth: "100%",
        alignItems: "flex-end",
      }}
    >
      <input
        className={errorClass}
        type={inputType}
        name="password"
        id={id}
        placeholder={placeholder}
        onInput={(e) => {
          setPassword(e.currentTarget.value);
        }}
      />
      {inputType === "password" && (
        <button className="eye-icon" onClick={() => setInputType("text")}>
          <img src={eye} alt="eye icon" />
        </button>
      )}
      {inputType === "text" && (
        <button className="eye-icon" onClick={() => setInputType("password")}>
          <img src={eyeOff} alt="closed eye icon" />
        </button>
      )}
    </div>
  );
}
