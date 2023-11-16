import {
  Transfer as TransferEvent
} from "../generated/Character/Character"
import {
  NPC
} from "../generated/schema"
import {  BigInt, ByteArray, Bytes } from "@graphprotocol/graph-ts";

export function handleTransfer(event: TransferEvent): void {
  const npc = loadOrCreateNPC(event.params.tokenId)
  npc.owner = event.params.to;
  npc.save();
}

export function loadOrCreateNPC(id: BigInt): NPC{
   let npc = NPC.load(Bytes.fromI32(id.toI32()))
   if (npc == null) { // if it doesn't exist, create the object, being mitned
      return new NPC(Bytes.fromI32(id.toI32()))
   }
   return npc
}