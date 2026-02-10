import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const baseOptions = {
  close: false,
  gravity: "top",
  position: "right",
  stopOnFocus: true,
  duration: 3000,
  style: {
    borderRadius: "8px",
    fontWeight: "500",
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
  },
};

export function successToastify(text, duration = 3000) {
  return Toastify({
    ...baseOptions,
    text: `✅ ${text}`,
    duration,
    style: {
      ...baseOptions.style,
      background: "linear-gradient(135deg, #00b09b, #96c93d)",
    },
  }).showToast();
}

export function errorToastify(text, duration = 3000) {
  return Toastify({
    ...baseOptions,
    text: `❌ ${text}`,
    duration,
    style: {
      ...baseOptions.style,
      background: "linear-gradient(135deg, #ff416c, #ff4b2b)",
    },
  }).showToast();
}
