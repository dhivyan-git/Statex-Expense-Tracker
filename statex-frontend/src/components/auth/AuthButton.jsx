function AuthButton({ title, type = "button", disabled = false }) {
    return (
        <button
            type={type}
            disabled={disabled}
            className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 py-4 text-lg font-bold text-white transition hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {title}
        </button>
    );
}

export default AuthButton;