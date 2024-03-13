import { useMemo, useReducer, useRef } from "react";
import { pushAlert } from "@context/actions/alertAction";
import { writeContract, waitForTransaction } from "@wagmi/core";

const useWriteContract = ({ address, abi, functionName }) => {
  const initialState = {
    error: undefined,
    data: undefined,
    writeStatus: 0,
  };

  // Keep state logic separated
  const fetchReducer = (state, action) => {
    switch (action.type) {
      case "idle":
        return { ...initialState, writeStatus: 0 };
      case "waiting":
        return { ...initialState, writeStatus: 1 };
      case "pending":
        return { ...initialState, writeStatus: 2 };
      case "success":
        return { ...initialState, writeStatus: 0, data: action.payload };
      case "error":
        return { ...initialState, writeStatus: 0, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  const write = useMemo(() => {
    return async ({ args, onSuccess, onError }) => {
      const _onSuccess = onSuccess ?? (() => { });
      const _onError = onError ?? (() => { });
      try {
        dispatch({ type: "waiting" });
        const { hash } = await writeContract({
          mode: "recklesslyUnprepared",
          address,
          abi,
          functionName: functionName,
          args: args ?? [],
        });

        pushAlert({
          msg: (
            <span>
              {" "}
              區塊驗證中... | Blockchain is doing its work...
              <a
                href={`https://sepolia.etherscan.io/tx/${hash}`}
                target="_blank"
                rel="noreferrer"
                className="font-extrabold text-blue-900"
              >
                &nbsp;View on Etherscan &#128279;
              </a>
            </span>
          ),
          type: "info",
        });
        dispatch({ type: "pending" });
        const data = await waitForTransaction({
          hash,
        });
        pushAlert({ msg: "Success! Refresh page to see new updates 🎉", type: "success" });
        dispatch({ type: "success", payload: data });

        await _onSuccess();
      } catch (error) {
        console.log(error);
        dispatch({ type: "error", payload: error });
        pushAlert({ msg: `Error! ${error}`, type: "failure" });
        await _onError();
      } finally {
        dispatch({ type: "idle" });
      }
    };
  }, [address, abi, functionName]);

  return { write, state };
};

export default useWriteContract;
