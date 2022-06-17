// Create a Uniswap Pool Instance
const { ethers } = require('ethers');
const { Pool, Route } = require("@uniswap/v3-sdk");
const { Token } = require('@uniswap/sdk-core')
const UniswapV3Pool = require('@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json');


const provider = new ethers.providers.JsonRpcProvider(
  "https://polygon-mainnet.g.alchemy.com/v2/YaB6ky45Wg63ZVcnivi2UB33otvsYotH"
);

const MaticUSDTPoolAddress = "0x9B08288C3Be4F62bbf8d1C20Ac9C5e6f9467d8B7"; // Matic / USDT Pool address

//Instance of the contract
const MaticUSDTPoolContract = new ethers.Contract(
  MaticUSDTPoolAddress,
  UniswapV3Pool.abi,
  provider
);

async function main() { 

    const Wmatic = "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270";
    const Usdt = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";

    const token0 = new Token(137, Wmatic, 18, "WMATIC", "Wrapped Matic");
    const token1 = new Token(
      137,
      Usdt,
      6,
      "USDT",
      "Tether"
    );

    const poolFee = await MaticUSDTPoolContract.fee();
    const slot0 = await MaticUSDTPoolContract.slot0();
    const poolLiquidity = await MaticUSDTPoolContract.liquidity();

    const pool = new Pool(
        token0,
        token1,
        poolFee,
        slot0[0],
        poolLiquidity,
        slot0[1]
    )

    const route = new Route([pool], token0, token1);
    console.log(`1 Wrapped Matic can be swapped for ${route.midPrice.toSignificant(6)} USDT`);
    console.log(`1 USDT can be swapped for ${route.midPrice.invert().toSignificant(6)} WMATIC`);

}

main();
