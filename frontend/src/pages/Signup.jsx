import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name: name,
        email: email,
        password: password,
      });

      alert("Signup successful 🔥");
      console.log(res.data);
    } catch (err) {
      console.log(err);
      alert("Signup failed ❌");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Signup</h1>

      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        /><br/><br/>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        /><br/><br/>

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        /><br/><br/>

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}