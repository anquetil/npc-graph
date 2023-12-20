import { ERC6551Registry } from "../generated/ERC6551Registry/ERC6551Registry";
import {
  Transfer as TransferEvent
} from "../generated/NFT/NFT"
import {
  NPC
} from "../generated/schema"
import {  Address, BigInt, Bytes } from "@graphprotocol/graph-ts";

export function handleTransfer(event: TransferEvent): void {
   let contract = ERC6551Registry.bind(event.address)
   let calculatedTBAAddress = contract.account(
      Address.fromString("0x41C8f39463A868d3A88af00cd0fe7102F30E44eC"), // need to change with new deploys
      Bytes.fromHexString("0x0000000000000000000000000000000000000000000000000000000000000000"),
      new BigInt(5),
      event.address,
      event.params.tokenId
   )
   const npc = loadOrCreateNPC(calculatedTBAAddress)
   npc.owner = event.params.to;
   npc.deployed = false;
   npc.tokenID = event.params.tokenId;
   npc.save();
}

export function loadOrCreateNPC(id: Address): NPC{
   let npc = NPC.load(id.toString())
   if (npc == null) { // if it doesn't exist, create the object, being mitned
      return new NPC(id.toString())
   }
   return npc
}