import { toast } from "react-toastify";
import { IState } from "./auth2";

export function checkResponse(result: Response) {
  if (result.ok) {
    return result.json();
  }
  throw new Error(`Ошибка ${result.status}`);
}

export function handleRejected(state: IState, { error }: any, options?: {noToast: boolean}) {
  if (!options?.noToast) {
    toast(error.message, { type: "error" });
  }

  console.error(error.message);
  state.load = false;
}
