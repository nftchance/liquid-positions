import { useEffect, useState } from 'react';

import { Contract, ethers } from 'ethers'

import abi from "../assets/abi.json";

const RPC_URL = "wss://eth-mainnet.g.alchemy.com/v2/WyBFuEnjTohf0DtDBV1araDXubDTXAJL"

const useContract = ({ 
    address 
}: { 
    address: string 
}): { 
    provider: ethers.providers.WebSocketProvider | null,
    contract: Contract | null
} => {
    const [provider, setProvider] = useState<ethers.providers.WebSocketProvider | null>(null)    

    const [contract, setContract] = useState<Contract | null>(null)

    // on every block, check the liquidity status of the provided token id

    useEffect(() => {
        const provider = new ethers.providers.WebSocketProvider(RPC_URL)

        setProvider(provider)

        // connect to contract on mainnet
        const contract = new ethers.Contract(address, abi, provider)

        setContract(contract)
    }, [address])

    return { provider, contract }
}

export { useContract }