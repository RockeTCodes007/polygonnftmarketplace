import Web3 from "web3";

const POLYGON_CHAIN_ID = 80001;
const web3 = new Web3();

async function checkIfConnected() {
  if (!window.ethereum) return false;
  else {
    const accs = await window.ethereum?.request({ method: "eth_accounts" });
    return accs.length != 0;
  }
}

async function isConnectedToPolygon() {
  const id = await window.ethereum?.request({ method: "net_version" });
  return id === POLYGON_CHAIN_ID;
}

async function switchToPolygon() {
  if (!(await isConnectedToPolygon())) {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: web3.utils.toHex(POLYGON_CHAIN_ID) }],
      });
    } catch (err) {
      if (err.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainName: "MUMBAI TESTNET",
              chainId: web3.utils.toHex(POLYGON_CHAIN_ID),
              nativeCurrency: { name: "MATIC", decimals: 18, symbol: "MATIC" },
              rpcUrls: [
                "https://rpc.ankr.com/polygon_mumbai/83b935eb9ef06db37440df0ec9db5c23e05cb335cb18af02d91a17418b7fac12",
              ],
            },
          ],
        });
      } else console.log(err);
    }
  }
}

export { checkIfConnected, switchToPolygon, isConnectedToPolygon };
