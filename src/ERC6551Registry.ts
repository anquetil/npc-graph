import {
  ERC6551AccountCreated as ERC6551AccountCreatedEvent
} from "../generated/ERC6551Registry/ERC6551Registry";
import {
  NPC
} from "../generated/schema"
import {  Address, BigInt, Bytes } from "@graphprotocol/graph-ts";

export function handleAccountCreated(event: ERC6551AccountCreatedEvent): void {
   if (event.params.tokenContract == Address.fromString("0x4dD30A31962431da2e7359de2527eeD09902B65F")){
      const npc = loadOrCreateNPC(event.params.tokenId)
      npc.deployed = true;
      npc.TBAAddress = event.params.account;
      npc.save();
   }
}

export function loadOrCreateNPC(id: BigInt): NPC{
   let npc = NPC.load(id.toString())
   if (npc == null) { // should never happen
      return new NPC(id.toString())
   }
   return npc
}