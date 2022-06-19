function redirBlock() {
    window.location.href = "block/" + document.getElementById("blockNumber").value;
}
function redirTxHash() {
    window.location.href = "tx/" + document.getElementById("txHash").value;
}
function redirAddress() {
    window.location.href = "account/" + document.getElementById("address").value;
}