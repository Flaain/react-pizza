/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "primary-orange": "#FE5F1E",
                "secondary-orange": "#B33F0F",
                "primary-black": "#181818",
                "primary-gray": "#F3F3F7",
                "expanded-linear": "linear-gradient(rgba(255,255,255,0), #fff)",
                modal: "rgba(0, 0, 0, .5)",
            },
            keyframes: {
                loading: {
                    "0%": { transform: "translate(-50%, -50%) rotate(0)" },
                    "100%": { transform: "translate(-50%, -50%) rotate(360deg)" },
                },
                shimmer: {
                    "100%": {
                        transform: "translateX(100%)",
                    },
                },
            },
            animation: {
                loading: "loading .5s linear infinite",
            },
        },
    },
    plugins: [],
};