// src/components/auth/CadastroSocialButtons.jsx
export function CadastroSocialButtons() {
  return (
    <div className="flex justify-center items-center gap-3 mt-6">
      <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-full shadow text-sm">
        <img
          src="https://img.icons8.com/color/24/google-logo.png"
          alt="Google"
        />
        Google
      </button>
      <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-full shadow text-sm">
        <img
          src="https://img.icons8.com/fluency/24/facebook-new.png"
          alt="Facebook"
        />
        Facebook
      </button>
      <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-full shadow text-sm">
        <img
          src="https://img.icons8.com/ios-filled/24/mac-os.png"
          alt="Apple"
        />
        Apple
      </button>
    </div>
  );
}
