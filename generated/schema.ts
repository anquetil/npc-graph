// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class NPC extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save NPC entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type NPC must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("NPC", id.toString(), this);
    }
  }

  static loadInBlock(id: string): NPC | null {
    return changetype<NPC | null>(store.get_in_block("NPC", id));
  }

  static load(id: string): NPC | null {
    return changetype<NPC | null>(store.get("NPC", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get owner(): Bytes {
    let value = this.get("owner");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toBytes();
    }
  }

  set owner(value: Bytes) {
    this.set("owner", Value.fromBytes(value));
  }

  get deployed(): boolean {
    let value = this.get("deployed");
    if (!value || value.kind == ValueKind.NULL) {
      return false;
    } else {
      return value.toBoolean();
    }
  }

  set deployed(value: boolean) {
    this.set("deployed", Value.fromBoolean(value));
  }

  get TBAAddress(): Bytes | null {
    let value = this.get("TBAAddress");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set TBAAddress(value: Bytes | null) {
    if (!value) {
      this.unset("TBAAddress");
    } else {
      this.set("TBAAddress", Value.fromBytes(<Bytes>value));
    }
  }
}
