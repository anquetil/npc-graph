import {
   TraitRegistered as TraitRegisteredEvent,
   TransferSingle as TransferSingleEvent,
   TransferBatch as TransferBatchEvent
} from "../generated/ERC1155Rails/ERC1155Rails"
import {
  Trait,
  OwnedTrait
} from "../generated/schema"
import {  Address, BigInt } from "@graphprotocol/graph-ts";
import { loadOrCreateNPC } from "./ERC6551Registry";

export function handleTraitRegistered(event: TraitRegisteredEvent): void {
  const trait = loadOrCreateTrait(event.params.traitId)
  trait.rleBytes = event.params.rleBytes
  trait.name = event.params.name;
  trait.save();
}


export function handleTransferSingle(event: TransferSingleEvent): void {
   transferTraitOwnership(event.params.from, event.params.to, event.params.id, event.params.value)
}

export function handleTransferBatch(event: TransferBatchEvent): void {
   for(let i = 0; i < event.params.ids.length; i++ ){
      transferTraitOwnership(event.params.from, event.params.to, event.params.ids[i], event.params.values[i])
   }
}

function transferTraitOwnership(from: Address, to: Address, id: BigInt, value: BigInt ): void {
   reduceTraitQuantiy(from, id, value);
   increaseTraitQuantity(to, id, value);
}

function increaseTraitQuantity(to: Address, id: BigInt, value: BigInt): void {
   const concatID = to.toHexString().concat('-').concat(id.toString())
   let ownedTrait = OwnedTrait.load(concatID)
   if (ownedTrait == null) { // NPC owns 0 of this trait so far, so need to add an OT object
      ownedTrait = new OwnedTrait(concatID)
      ownedTrait.quantity = value.toI32();
      ownedTrait.save();
      
      const npc = loadOrCreateNPC(to)
      const newOwnedTraits = npc.ownedTraits
      newOwnedTraits.push(concatID)
      npc.ownedTraits = newOwnedTraits;
      npc.save();
   } else {
      ownedTrait.quantity += value.toI32(); 
      ownedTrait.save();
   }
   return;
}

function reduceTraitQuantiy(from: Address, id: BigInt, value: BigInt): void {
   const concatID = from.toHexString().concat('-').concat(id.toString());
   let ownedTrait = OwnedTrait.load(concatID)
   if (ownedTrait) { // if null, don't track since it didn't't belong to an nPC before
      ownedTrait.quantity -= value.toI32();
      ownedTrait.save();
   }
   return;
}


/* HELPERS */
export function loadOrCreateTrait(id: BigInt): Trait {
   let trait = Trait.load(id.toString())
   if (trait == null) { // if it doesn't exist, create the object, being mitned
      return new Trait(id.toString())
   }
   return trait;
}