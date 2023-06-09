import React, { useState } from "react";
import './LoginMiddle.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginMiddle(props) {
  const [userList, setUserList] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("Por favor, preencha ambos os campos");
    } else {
      setLoading(true);

      axios.get("http://localhost:5000/users").then((res) => {
        setUserList(res.data);
        setLoading(false);
        let user;
        const userFound = res.data.some((o) => { 
            user=o
          return email === o.email && password === o.senha;
        });

        if (userFound) {
          console.log(props);
          props.setIsLogged(true);
          props.setLoggedId(user._id);
          navigate("/");
        } else {
          alert("Usuário não cadastrado!");
          setEmail(""); // Reset email field
          setPassword(""); // Reset password field
        }
      });
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua Senha"
        />
        <button type="submit">
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </>
  );
}

export default LoginMiddle;
