import { ValueObject } from "../value-object";

import { v7 as uuidV7, validate as uuidValidate } from "uuid";

export class Uuid extends ValueObject {
  private _id: string;

  constructor(id: string) {
    super();
    this._id = id || uuidV7();

    this.validate();
  }

  private validate() {
    const isValid = uuidValidate(this._id);
    if (!isValid) {
      throw new InvalidUuidError();
    }
  }

  toString() {
    return this._id;
  }
}

export class InvalidUuidError extends Error {
  constructor(message?: string) {
    super(message || "ID mst be a valid UUID");
    this.name = "InvalidUuidError";
  }
}
