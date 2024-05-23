// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TwoFactorAuth {
    struct User {
        string email;
        string identifier;
    }

    mapping(string => User) private usersCodes;

    function addUser(string memory _email, string memory _identifier) public {
        require(bytes(_email).length > 0, "Email cannot be empty");
        require(bytes(_identifier).length > 0, "Identifier cannot be empty");

        usersCodes[_email] = User(_email, _identifier);
    }

    function verifyIdentifier(string memory _email, string memory _identifier) public view returns (bool) {
        User memory user = usersCodes[_email];

        bool success = keccak256(abi.encodePacked(user.identifier)) == keccak256(abi.encodePacked(_identifier));

        return success;
    }
}
