import { Mail, User } from "lucide-react";

function AuthInput({
  type = "text",
  placeholder,
  value,
  onChange,
}) {

  const Icon =
    placeholder.toLowerCase().includes("email")
      ? Mail
      : User;

  return (

    <div className="relative">

      <Icon
        size={20}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
        w-full
        h-16
        rounded-2xl
        border
        border-slate-700
        bg-slate-800/60
        backdrop-blur-xl
        pl-14
        pr-5
        text-white
        text-lg
        placeholder:text-slate-500
        outline-none
        transition-all
        duration-300
        hover:border-slate-500
        focus:border-blue-500
        focus:ring-4
        focus:ring-blue-500/20
        "
      />

    </div>

  );

}

export default AuthInput;