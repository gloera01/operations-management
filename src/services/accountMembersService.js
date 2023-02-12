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
    const handleGetUser = async (userId) => {
      const user = await this.#userModel.findById(userId);
      return { id: userId, user };
    };

    const foundUsersResults = await Promise.allSettled(
      incomingMembers.map((m) => handleGetUser(m.userId))
    );

    const found = [];
    const notFound = [];

    foundUsersResults.forEach((pr) => {
      const { user, id } = pr.value;
      if (user) {
        found.push(user);
      } else {
        notFound.push(id);
      }
    });

    return { found, notFound };
  }
}

export default AccountMembersService;
