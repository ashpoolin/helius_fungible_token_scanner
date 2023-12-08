# helius_fungible_token_scanner
Tool to scan your solana wallet (a top-level "owner" acount) and it's accompanying fungible assets, return account info, and value. This tool relies on Helius' DAS Fungible Token Extension. Read more about it here: [https://docs.helius.dev/compression-and-das-api/digital-asset-standard-das-api/fungible-token-extension-beta#how-to-get-started](https://docs.helius.dev/compression-and-das-api/digital-asset-standard-das-api/fungible-token-extension-beta#how-to-get-started) 

Modify it and make it your own :)

## Requirements
1. You need a helius API key: [https://www.helius.dev/](https://www.helius.dev/)
2. optionally install [https://csvkit.readthedocs.io/en/0.9.1/install.html](csvkit) to prettify and manipulate the csv file afterwards. 

## Use:
1. install: `npm install`
2. Modify your `.env` file to include the correct API key
3. open `index.js` and update the `ownerAddresses` array to include all addresses you want to scan.
4. Adjust the delay timer in ms to accommodate whatever rate limits you have.
5. Scan wallets and dump to JSON: `node index.js > outfile.json`
6. Scan wallets and dump to CSV (requires command line tools `jq` and `csvkit`): `node index.js | jq . | in2csv --format json > outfile.csv`
7. make a csv output a human-readable output: `node index.js | jq . | in2csv --format json | csvlook`  
8. Exercise for the reader: take your JSON or CSV file and import into Excel / db to grab coin and USD totals; group by owner or mint, for example.
Example:

![Example Scan](images/example_scan.jpg)

## DISCLAIMER
The author is not responsible for data accuracy, bugs, or whatever damage is caused by or to you when using this tool. Use at your own risk. 