class AccountMembersService {
  mapIntoDBMembers(requestBodyMembers) {
    if (!requestBodyMembers?.length) return [];

    return requestBodyMembers.map((m) => ({
      user: m.userId,
      assignation: {
        startDate: m.startDate,
        endDate: m.endDate,
      },
    }));
  }
}

export default AccountMembersService;
