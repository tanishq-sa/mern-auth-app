import { useState } from "react";

const Input = ({ label, type = "text", value, onChange, placeholder, error, id }) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-text-secondary mb-1.5 tracking-wide"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full px-4 py-3 rounded-lg bg-bg border text-text-primary placeholder-text-secondary/50 text-sm tracking-wide
          ${focused ? "border-accent" : "border-border"}
          ${error ? "border-error" : ""}
          focus:border-accent
        `}
        style={{
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
          boxShadow: focused ? "0 0 0 1px rgba(255,255,255,0.1)" : "none",
        }}
      />
      {error && (
        <p className="mt-1.5 text-xs text-error animate-shake">{error}</p>
      )}
    </div>
  );
};

export default Input;
