class AccountMembersService {
  constructor(userModel) {
    this.#userModel = userModel;
  }

  #userModel = null;

  mapIntoDBMembers(requestBodyMembers = []) {
    if (!requestBodyMembers.length) return [];

    return requestBodyMembers.map((m) => ({
      user: m.userId,
      assignation: {
        startDate: m.startDate,
        endDate: m.endDate,
      },
    }));
  }

  async verifyExist(incomingMembers = []) {
    const foundUsersResults = await Promise.allSettled(
      incomingMembers.map((mem) => this.#userModel.findById(mem.userId))
    );

    const found = [];
    const notFound = [];

    foundUsersResults.forEach((user) => {
      if (user) {
        found.push(user);
      } else {
        notFound.push(user);
      }
    });

    return { found, notFound };
  }
}

export default AccountMembersService;
