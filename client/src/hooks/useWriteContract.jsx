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
      case "waitting":
        return { ...initialState, writeStatus: 1 };
      case "pending":
        return { ...initialState, writeStatus: 2 };
      case "successed":
        return { ...initialState, writeStatus: 0, data: action.payload };
      case "error":
        return { ...initialState, writeStatus: 0, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  const write = useMemo(async() => {
    return async ({ args, onSuccess, onError }) => {
      const _onSuccess = onSuccess ?? (() => {});
      const _onError = onError ?? (() => {});
      try {
        dispatch({ type: "waitting" });
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
              區塊驗證中...
              <a
                href={`https://goerli.etherscan.io/tx/${hash}`}
                target="_blank"
                rel="noreferrer"
              >
                View on Etherscan
              </a>
            </span>
          ),
          type: "info",
        });
        dispatch({ type: "pending" });
        const data = await waitForTransaction({
          hash,
        });
        pushAlert({ msg: "Success! Minted", type: "success" });
        dispatch({ type: "successed", payload: data });

        await _onSuccess();
      } catch (error) {
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
