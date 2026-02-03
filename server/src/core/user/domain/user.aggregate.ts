
export type UserConstrictorProps = {
  user_id: string;
}



export class User {
  private _user_id: string;

  constructor(props: UserConstrictorProps) {
    this._user_id = props.user_id;
  }

  get user_id() {
    return this._user_id;
  }
}