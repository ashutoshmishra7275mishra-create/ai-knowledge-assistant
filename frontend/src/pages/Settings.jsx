import React, { useState } from "react";

const Settings = () => {
  const [username, setUsername] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [password, setPassword] = useState("");

  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

  const [errors, setErrors] = useState({});

  // VALIDATION FUNCTION
  const validateForm = () => {
    let newErrors = {};

    if (!username.trim()) newErrors.username = "Username cannot be empty";
    if (!email.trim()) newErrors.email = "Email is required";
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email))
        newErrors.email = "Enter a valid email address";
    }

    if (password && password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0; // TRUE if valid
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // do NOT save if invalid
    }

    alert("✅ Settings saved successfully!");
    console.log({ username, email, password, darkMode, notifications });
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Profile */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Profile</h2>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border px-4 py-2 rounded w-full"
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-4 py-2 rounded w-full mt-4"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Change Password</h2>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-4 py-2 rounded w-full"
            placeholder="New Password (optional)"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Preferences */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Preferences</h2>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            Dark Mode
          </label>

          <h3 className="font-medium mt-3">Notifications</h3>

          <div className="flex flex-col gap-2 ml-4 mt-2">
            <label>
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={() =>
                  setNotifications((prev) => ({
                    ...prev,
                    email: !prev.email,
                  }))
                }
              />{" "}
              Email
            </label>

            <label>
              <input
                type="checkbox"
                checked={notifications.sms}
                onChange={() =>
                  setNotifications((prev) => ({
                    ...prev,
                    sms: !prev.sms,
                  }))
                }
              />{" "}
              SMS
            </label>

            <label>
              <input
                type="checkbox"
                checked={notifications.push}
                onChange={() =>
                  setNotifications((prev) => ({
                    ...prev,
                    push: !prev.push,
                  }))
                }
              />{" "}
              Push Notifications
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Settings;
