import {
  Transfer as TransferEvent
} from "../generated/NFT/NFT"
import {
  NPC
} from "../generated/schema"
import {  BigInt, ByteArray, Bytes } from "@graphprotocol/graph-ts";

export function handleTransfer(event: TransferEvent): void {
  const npc = loadOrCreateNPC(event.params.tokenId)
  npc.owner = event.params.to;
  npc.deployed = false;
  npc.save();
}

export function loadOrCreateNPC(id: BigInt): NPC{
   let npc = NPC.load(id.toString())
   if (npc == null) { // if it doesn't exist, create the object, being mitned
      return new NPC(id.toString())
   }
   return npc
}