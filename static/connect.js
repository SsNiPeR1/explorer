const ethereumButton = document.querySelector('.enableEthereumButton');
const showAccount = document.querySelector('.showAccount');

ethereumButton.addEventListener('click', () => {
    getAccount();
});
async function getAccount() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    document.cookie = "account=" + account;
    window.location.reload();
}

async function setNetwork() {
    try {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x124f8' }],
        });
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x124f8',
                  chainName: 'ResinCoin',
                  nativeCurrency: {
                    name: "Resin",
                    symbol: "RESIN",
                    decimals: 18,
                  },
                  rpcUrls: ['https://mainnet.resincoin.ml'] /* ... */,
                  blockExplorerUrls: ['https://explorer.resincoin.ml']
                },
              ],
            });
          } catch (addError) {
            // handle "add" error
          }
        }
        // handle other "switch" errors
      }
}