export class UserIdDoesNotExists extends Error {
  constructor() {
    super('user id does not exist')
  }
}
