import {
  ERC6551AccountCreated as ERC6551AccountCreatedEvent
} from "../generated/ERC6551Registry/ERC6551Registry";
import {
  NPC
} from "../generated/schema"
import {  Address, BigInt } from "@graphprotocol/graph-ts";

export function handleAccountCreated(event: ERC6551AccountCreatedEvent): void {
   // NFT721 contract
   if (event.params.tokenContract == Address.fromString("0xC2c16A16Bcb774663a84C44a960693E73F273617")){
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