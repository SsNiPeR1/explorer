const ethereumButton = document.querySelector('.enableEthereumButton');
const showAccount = document.querySelector('.showAccount');
const donateButton = document.querySelector('.donateButton');

let accounts = [];

if (document.cookie.indexOf("account=") < 0) {
    ethereumButton.addEventListener('click', () => {
    getAccount();
});};

async function getAccount() {
    accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    document.cookie = "account=" + account;
    window.location.reload();
}

async function setNetwork() {
    try {
        console.log('try - before request')
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x124f8' }],
        });
        console.log('try - after request')
    }
    catch (err) {
        console.log('catch - before request')
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
        console.log('catch - after request')
    }
}

window.getCookie = function(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
  }

donateButton.addEventListener('click', () => {
    const account = window.getCookie('account');
    console.log(account);
    ethereum
      .request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: window.getCookie('account'),
            to: '0xFd99EBF84067693De41c0b96c949F3Eb878316Ca',
            value: '0x8AC7230489E80000',
          },
        ],
      })
      .then((txHash) => console.log(txHash))
      .catch((error) => console.error);
});