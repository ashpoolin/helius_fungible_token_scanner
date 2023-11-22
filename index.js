const axios = require("axios");
const { Connection, LAMPORTS_PER_SOL, PublicKey } = require("@solana/web3.js");
require("dotenv").config();

const HELIUS_RPC_URL = process.env.HELIUS_RPC_URL;
const CONNECTION = new Connection(HELIUS_RPC_URL, "confirmed");

const owner = process.argv[2];

const scanTokens = async () => {
  console.log("symbol,id,uibalance,price_per_token,total_price,currency,associated_token_address");


  const getBalance = async (address) => {
    const lamports = await CONNECTION.getBalance(new PublicKey(address));
    return lamports / LAMPORTS_PER_SOL;
  }
  const ownerBalance = await getBalance(owner);
  console.log(`SOL,undefined,${ownerBalance},undefined,undefined,undefined,${owner}`);

  const payload = {
      jsonrpc: '2.0',
      // id: 'helius-test',
      method: 'searchAssets',
      params: {
        ownerAddress: `${owner}`,
        tokenType: 'fungible' // fungible, nonFungible, regularNft , compressedNft, and all
      }
  };
  
  axios.post(`${HELIUS_RPC_URL}`, payload)
    .then(response => {
      response.data.result.items.forEach(asset => {

        // don't show me garbage
        if (asset.token_info.symbol !== undefined) {
          // console.log(JSON.stringify(asset));        
          const id = asset.id //
          const description = asset.content.metadata?.description;
          const name = asset.content.metadata?.name;
          const token_standard = asset.content.metadata?.token_standard;
          // token_info
          const symbol = asset.token_info?.symbol;
          const balance = asset.token_info?.balance;
          const supply = asset.token_info?.supply;
          const decimals = asset.token_info?.decimals;
          const token_program = asset.token_info?.token_program;
          const associated_token_address = asset.token_info?.associated_token_address;
          const uibalance = balance ? balance / (10 ** decimals) : undefined;
          // price_info
          const price_per_token = asset.token_info?.price_info?.price_per_token;
          const total_price = asset.token_info?.price_info?.total_price;
          const currency = asset.token_info?.price_info?.currency;
          console.log(
              `${symbol},${id},${uibalance},${price_per_token},${total_price},${currency},${associated_token_address}`
          );
        }
      })
    })
    .catch(error => {
      console.error(error);
    });
}
scanTokens();