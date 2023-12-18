import {
  TraitRegistered as TraitRegisteredEvent
} from "../generated/TraitRegistry/TraitRegistry"
import {
  Trait
} from "../generated/schema"
import {  BigInt } from "@graphprotocol/graph-ts";

export function handleTraitRegistered(event: TraitRegisteredEvent): void {
  const trait = loadOrCreateTrait(event.params.traitId)
  trait.rleBytes = event.params.rleBytes
  trait.name = event.params.name;
  trait.save();
}

export function loadOrCreateTrait(id: BigInt): Trait{
   let trait = Trait.load(id.toString())
   if (trait == null) { // if it doesn't exist, create the object, being mitned
      return new Trait(id.toString())
   }
   return trait;
}