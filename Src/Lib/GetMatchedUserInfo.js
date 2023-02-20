const GetMatchedUserInfo = (users, userLoggedIn) => {
  const newUsers = { ...users };
  delete newUsers[userLoggedIn];

  const [id, user] = Object.entries(newUsers).flat(); //convert the object into an array

  return {id, ...user}
};
