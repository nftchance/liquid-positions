import { useState } from 'react'

import { useLiquidityOracle } from "./hooks";

import './App.css'

function App() {
  const [tokenId, setTokenId] = useState(187747)

  const {
    contract,
    blockNumber,
    owner,
    metadata,
    position,
    liquidity
  } = useLiquidityOracle({ tokenId })

  return (
    <div className="app">
      <div className="config">
        <p><strong>Contract Address:</strong> {contract?.address}</p>
        <p>{blockNumber}</p>
      </div>
      <div className="display">
        <img
          src={metadata?.image}
          alt="NFT"
          style={{
            width: "100%",
          }}
        />
      </div>

      <div className="controller">
        <form>
          <label htmlFor="tokenId">Token ID</label>
          <input
            type="number"
            id="tokenId"
            value={tokenId}
            onChange={(e) => setTokenId(parseInt(e.target.value))}
          />
        </form>

        <h2>{metadata?.name}</h2>

        <p><strong>Liquidity:</strong> {liquidity}</p>
        <p><strong>Owner:</strong> {owner}</p>

        <p><strong>Position:</strong></p>
        {/* loop through all fields in position */}
        {position && Object.keys(position).map((key) => (
          <p key={key}>{key}: {position[key].toString()}</p>
        ))}
      </div>
    </div>
  )
}

export default App
