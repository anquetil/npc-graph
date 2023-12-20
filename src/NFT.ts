import { ERC6551Registry } from "../generated/ERC6551Registry/ERC6551Registry";
import {
  Transfer as TransferEvent
} from "../generated/NFT/NFT"
import {
  NPC
} from "../generated/schema"
import {  Address, BigInt, Bytes, log } from "@graphprotocol/graph-ts";

/* 
- TODO: handleTransfer when owner changes, not just minting from 0
*/
export function handleTransfer(event: TransferEvent): void {
   let contract = ERC6551Registry.bind(Address.fromString("0x000000006551c19487814612e58FE06813775758"))
   let calculatedTBAAddressResult = contract.try_account(
      Address.fromString("0x41C8f39463A868d3A88af00cd0fe7102F30E44eC"), // need to change with new deploys
      Bytes.fromHexString("0x0000000000000000000000000000000000000000000000000000000000000000"),
      BigInt.fromI32(5),
      event.address,
      event.params.tokenId 
   )
   let calculatedTBAAddress:Address;
   if (calculatedTBAAddressResult.reverted){
      log.info("account() reverted", []);
   } else {
      log.info("creating NPC = {}", [calculatedTBAAddressResult.value.toHexString()])
      calculatedTBAAddress = calculatedTBAAddressResult.value;
   }
   const npc = loadOrCreateNPC(calculatedTBAAddress!)
   npc.owner = event.params.to;
   npc.deployed = false;
   npc.tokenID = event.params.tokenId;
   npc.ownedTraits = [];
   npc.save();
}

export function loadOrCreateNPC(id: Address): NPC{
   let npc = NPC.load(id.toHexString())
   if (npc == null) { // if it doesn't exist, create the object, being mitned
      return new NPC(id.toHexString())
   }
   return npc
}