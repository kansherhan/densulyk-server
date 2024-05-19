const MyContract = artifacts.require("MyContract");

contract("MyContract", (accounts) => {
  it("should deploy with the correct initial message", async () => {
    const instance = await MyContract.deployed();
    const message = await instance.message();
    assert.equal(message, "Hello, Truffle!", "Initial message is incorrect");
  });

  it("should set a new message correctly", async () => {
    const instance = await MyContract.deployed();
    await instance.setMessage("New message");
    const message = await instance.message();
    assert.equal(message, "New message", "Message was not set correctly");
  });
});
