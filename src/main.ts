import {TypeormDatabase} from '@subsquid/typeorm-store'
import {processor,CONTRACT_ADDRESS} from './processor'
import {Approval, OwnershipTransferred,Transfer} from './model'
import * as PepeContractABI from './abi/PepeContract'









processor.run(new TypeormDatabase({supportHotBlocks: true}), async (ctx) => {
    const transfers: Transfer[] = []
    for (let c of ctx.blocks) {
        for (let log of c.logs) {
            if (log.address !== CONTRACT_ADDRESS || log.topics[0] !== PepeContractABI.events.Approval.topic, 
                PepeContractABI.events.OwnershipTransferred.topic, 
                PepeContractABI.events.Transfer.topic) continue
            let { previousOwner, newOwner } = PepeContractABI.events.OwnershipTransferred.decode(log)
            let {from, to, value} = PepeContractABI.events.Transfer.decode(log)

            transfers.push(
                new Transfer({ id: log.transaction!.hash
                    
                })
            )
        }
    }
    await ctx.store.save(transfers)
})