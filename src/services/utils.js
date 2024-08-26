import { toast } from "react-toastify";

export function checkResponse(result) {
  if (result.ok) {
    return result.json();
  }
  throw new Error(`Ошибка ${result.status}`);
}

export function handleRejected(state, { error }, options) {
  if (!options?.noToast) {
    toast(error.message, { type: "error" });
  }

  console.error(error.message);
  state.load = false;
}
