import { Signinowner } from "../../services/fetch";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

export const Loginowner = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passcode, setPasscode] = useState("");
  const navigate = useNavigate();

  const handleLoginowner = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await Signinowner(email, password, passcode);
      console.log(response);

      if (response.success) {
        toast.success(response.message || "Login successful");
        // Redirect after login
        navigate("/owner/dashboard");
      } else {
        toast.error(response.message || "Login failed");
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      toast.error(error.message || "Login failed");
    }
  };

  return (
    <div>
      <Toaster />
      <form onSubmit={handleLoginowner}>
        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Passcode"
          required
          onChange={(e) => setPasscode(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
