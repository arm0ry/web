import { useDynamicContext } from "@dynamic-labs/sdk-react";

const ConnectButton = () => {
  const {
    user,
    setShowAuthFlow,
    showAuthFlow,
  } = useDynamicContext();

  if (user && !showAuthFlow) {
    return <></>;
  }
  return (
    <div>
      <button
        className="pushable"
        type="button"
        onClick={() => setShowAuthFlow(true)}
      >
        <span className="front">Connect Wallet</span>
      </button>
    </div>
  );
};
export default ConnectButton;
