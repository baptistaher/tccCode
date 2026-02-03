import isEqual from "lodash/isEqual";

export class ValueObject {
  isEqual(vo: this): boolean {
    if (vo === null || vo === undefined) {
      return false;
    }

    if (vo.constructor.name !== this.constructor.name) {
      return false;
    }

    return isEqual(this, vo);
  }
}
