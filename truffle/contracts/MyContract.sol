pragma solidity ^0.8.0;

contract MyContract {
    string public message;

    constructor(string memory _message) {
        require(bytes(_message).length > 0, "Message cannot be empty");
        message = _message;
    }

    function setMessage(string memory _message) public {
        require(bytes(_message).length > 0, "Message cannot be empty");
        message = _message;
    }
}
