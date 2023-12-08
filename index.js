const axios = require("axios");
const { Connection, LAMPORTS_PER_SOL, PublicKey } = require("@solana/web3.js");
require("dotenv").config();

const HELIUS_RPC_URL = process.env.HELIUS_RPC_URL;
const CONNECTION = new Connection(HELIUS_RPC_URL, "confirmed");

// no longer using command line arg
// const address = process.argv[2];

// put in your top level wallet addresses ("owner") here
const ownerAddresses = [
  //examples
  "FWznbcNXWQuHTawe9RxvQ2LdCENssh12dsznf4RiouN5", // kraken
  "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM", // binance cold
  "5VCwKtCXgCJ6kit5FybXjvriW3xELsFDhYrPSqtJNmcD", // okx
];

const scanTokens = async () => {
  let fungibleTokenArray = [];

  await Promise.all(
  ownerAddresses.map(async (address) => {
    const selectedType = "fungible";
    const payload = {
      jsonrpc: "2.0",
      id: "helius-test",
      method: "searchAssets",
      params: {
        ownerAddress: address,
        tokenType: `${selectedType}`, // fungible, nonFungible, regularNft , compressedNft, and all (note: all types other than 'fungible' will require additional work to parse the results)
        displayOptions: {
          showNativeBalance: true,
        },
      },
    };

    // let walletValue = 0;
    await axios
      .post(HELIUS_RPC_URL, payload)
      .then((response) => {
        // GET SOL INFO
        const ownerBalance =
          response.data.result.nativeBalance.lamports / LAMPORTS_PER_SOL;
        const pricePerSol = response.data.result.nativeBalance.price_per_sol;
        const totalPrice = response.data.result.nativeBalance.total_price;
        const solanaObject = {};
        solanaObject.symbol = "SOL";
        solanaObject.mint = "-";
        solanaObject.owner = address;
        solanaObject.address = address;
        solanaObject.balance = ownerBalance;
        solanaObject.price = pricePerSol;
        solanaObject.total = totalPrice;
        fungibleTokenArray.push(solanaObject);
        // walletValue += totalPrice;

        // GET SPL INFO
        response.data.result.items.forEach((asset) => {
          // don't show me garbage
          if (asset.token_info.symbol !== undefined) {
            const tokenData = {};
            tokenData.symbol = asset.token_info?.symbol;
            tokenData.mint = asset.id;
            tokenData.owner = address;
            tokenData.address = asset.token_info?.associated_token_address;
            const balance = asset.token_info?.balance;
            const decimals = asset.token_info?.decimals;
            tokenData.balance = balance ? balance / 10 ** decimals : undefined;
            tokenData.price = asset.token_info?.price_info?.price_per_token;
            tokenData.total = asset.token_info?.price_info?.total_price;
            fungibleTokenArray.push(tokenData);
            // walletValue += tokenData.total;
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
    })
  );
    console.log(JSON.stringify(fungibleTokenArray));
}
scanTokens();
