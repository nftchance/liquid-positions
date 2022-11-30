import { useEffect, useMemo, useState } from 'react'

import { Contract } from 'ethers';

import { useContract } from '../hooks'

const mainnetAddress = '0xc36442b4a4522e871399cd717abdd847ab11fe88';

const useLiquidityOracle = ({
    tokenId
}: {
    tokenId: number
}): {
    contract: Contract | null,
    blockNumber: number | null,
    owner: string | null,
    metadata: any | null,
    position: any | null,
    liquidity: number
} => {
    const { provider, contract } = useContract({
        address: mainnetAddress
    })

    const [blockNumber, setBlockNumber] = useState<number | null>(0)

    const [owner, setOwner] = useState<string | null>(null);
    const [metadata, setMetadata] = useState<any | null>(null);
    const [position, setPosition] = useState<any | null>(null);

    const [liquidity, setLiquidity] = useState(0);
    const [fees, setFees] = useState(0);

    const handleNewBlock = (blockNumber: number) => {
        setBlockNumber(blockNumber)

        // check the owner asynchronously don't wait for it
        contract?.ownerOf(tokenId).then((owner: string) => {
            setOwner(owner)
        });
    }

    useEffect(() => {
        if (!provider) return;

        const blockNumber = provider.getBlockNumber().then((blockNumber: number) => {
            handleNewBlock(blockNumber)

            // get the tokenURI metadata
            contract?.tokenURI(tokenId).then((tokenURI: string) => {
                // parse the encoded metadata with the image field removed
                const metadata = JSON.parse(atob(tokenURI.split(',')[1]))

                setMetadata(metadata)
            });

            // get the position
            contract?.positions(tokenId).then((position: any) => {
                setPosition(position)
            });
        });

        provider.on('block', handleNewBlock)

        return () => { provider.removeAllListeners('block') }
    }, [provider, tokenId])

    return {
        contract,
        blockNumber,
        owner,
        metadata,
        position,
        liquidity,
    }
}

export { useLiquidityOracle }