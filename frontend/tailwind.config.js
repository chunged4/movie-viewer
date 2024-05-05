/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                "nsans-light": ["Nsans Light"],
                "nsans-medium": ["Nsans Medium"],
                "nsans-regular": ["Nsans Regular"],
                "nsans-bold": ["Nsans Bold"],
            },
        },
    },
    plugins: [require("tailwind-scrollbar-hide")],
};

export default tailwindConfig;
