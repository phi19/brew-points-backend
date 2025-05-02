exports.serializeSingleUser = (user) => ({
  id: user.id,
  email: user.email,
  name: user.name,
  loyaltyPoints: user.loyaltyPoints,
});
