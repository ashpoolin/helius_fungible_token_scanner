# helius_fungible_token_scanner
Tool to scan your solana wallet (a top-level "owner" acount) and it's accompanying fungible assets, return account info, and value. This tool relies on Helius' DAS Fungible Token Extension. Read more about it here: [https://docs.helius.dev/compression-and-das-api/digital-asset-standard-das-api/fungible-token-extension-beta#how-to-get-started](https://docs.helius.dev/compression-and-das-api/digital-asset-standard-das-api/fungible-token-extension-beta#how-to-get-started) 

Modify it and make it your own :)

## Requirements
1. You need a helius API key: [https://www.helius.dev/](https://www.helius.dev/)
2. optionally install [https://csvkit.readthedocs.io/en/0.9.1/install.html](csvkit) to prettify and manipulate the csv file afterwards. 

## Use:
1. install: `npm install`
2. Modify your `.env` file to include the correct API key
3. Scan an owner wallet: `node --no-warnings index.js <ADDRESS_YOU_WANT_TO_SCAN>`
4. output to csv: `node --no-warnings index.js <ADDRESS_YOU_WANT_TO_SCAN> > <SCANNED_OUTPUT>.csv`
5. make it easier to read: `node --no-warnings index.js <ADDRESS_YOU_WANT_TO_SCAN> | csvlook`  
_*Note: the --no-warnings flag is used because Axios just says something annoying when you call the fetch command. It should be OK for our purposes.*_

Example:

![Example Scan](images/example_scan.jpg)

## DISCLAIMER
The author is not responsible for data accuracy, bugs, or whatever damage is caused by or to you when using this tool. Use at your own risk. 