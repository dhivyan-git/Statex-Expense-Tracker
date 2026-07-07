import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";

function PasswordInput({

  value,
  onChange,

}) {

  const [showPassword, setShowPassword] = useState(false);

  return (

    <div className="relative">

      <Lock
        size={20}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
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
        pr-16
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

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="
        absolute
        right-5
        top-1/2
        -translate-y-1/2
        text-slate-400
        hover:text-white
        transition
        "
      >

        {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}

      </button>

    </div>

  );

}

export default PasswordInput;