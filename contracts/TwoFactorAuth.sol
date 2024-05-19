pragma solidity ^0.8.0;

contract TwoFactorAuth {
    mapping(address => uint) public userSecrets;

    event SecretSet(address indexed user);

    function setUserSecret(uint secret) public {
        userSecrets[msg.sender] = secret;
        emit SecretSet(msg.sender);
    }

    function verifyCode(uint code) public view returns (bool) {
        return (keccak256(abi.encodePacked(code)) == keccak256(abi.encodePacked(userSecrets[msg.sender])));
    }
}
