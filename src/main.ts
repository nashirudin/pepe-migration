import {TypeormDatabase} from '@subsquid/typeorm-store'
import {processor,CONTRACT_ADDRESS} from './processor'
import {Approval, OwnershipTransferred,Transfer} from './model'
import * as PepeContractABI from './abi/PepeContract'
import { decodeHex } from '@subsquid/evm-processor'




processor.run(new TypeormDatabase({supportHotBlocks: true}), async (ctx) => {
    const transfers: Transfer[] = []
    const ownershipTransfers: OwnershipTransferred[] = [];
    const approvals: Approval[] = []
    for (let block of ctx.blocks) {
        for (let log of block.logs) {
        if (log.topics[0] === PepeContractABI.events.Approval.topic) {
        let event = PepeContractABI.events.Approval.decode(log);
        let approval = new Approval({
            id: log.transaction?.hash,
            owner: event.owner,
            spender: event.spender,
            value: event.value,
            blockNumber: BigInt(block.header.height),
            blockTimestamp: BigInt(block.header.timestamp),
            transactionHash: decodeHex(log.address)
        });
        await ctx.store.save(approvals)
    }

    if (log.topics[0] === PepeContractABI.events.OwnershipTransferred.topic) {
    let event = PepeContractABI.events.OwnershipTransferred.decode(log);
    let ownershipTransferred = new OwnershipTransferred({
        id: log.transaction?.hash,
        previousOwner: event.previousOwner,
        newOwner: event.newOwner,
        transactionHash: log.transaction?.hash,
        blockNumber: BigInt(block.header.height),
        blockTimestamp: BigInt(block.header.timestamp),
      });
      await ctx.store.save(ownershipTransfers)
    }
    if (log.topics[0] === PepeContractABI.events.Transfer.topic) {
        let event = PepeContractABI.events.Transfer.decode(log);
        let transfer = new Transfer({
          id: log.transaction?.hash,
          from: event.from,
          to: event.to,
          value: event.value,
          transactionHash: log.transaction?.hash,
          blockNumber: BigInt(block.header.height),
          blockTimestamp: BigInt(block.header.timestamp),
        });
        await ctx.store.save(transfers)
    }
}
}
ctx.store.upsert([...approvals.values()]);
ctx.store.upsert([...ownershipTransfers.values()]);
ctx.store.upsert([...transfers.values()]);
    
});
