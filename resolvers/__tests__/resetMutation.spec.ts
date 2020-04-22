import Reset from '../ResetMutations';

describe('Testing reset password', () => {
  // Throws a big error
  // Error: Parse Error: Duplicate Content-Length
  // Still troubleshooting

  // test('should test initiateReset mutation', async () => {
  //   const user = { email: "HarryPotter@gmail.com" };

  //   const res = await Reset.initiateReset(null, user);

  //   console.log(res);
  // })


  test("should test resetPassword Mutation", async () => {
    const user = { email: "HarryPotter@gmail.com", password: "testing" };

    const res = await Reset.resetPassword(null, user);

    expect(res).toMatch(/password updated/i)
  });
})
