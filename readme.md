# Simple Peer-to-Peer connection example with PeerJS 

Just a simple example of a Peer-to-Peer (a simplification of WebRTC) connection using PeerJS, that can be easily adopted in other projects.

## Installation

## Usage 

Use Host-Button to show your peer ID or the Connect-Button to connect to another peer by inserting its ID in the input field and pressing the "Go"-Button. After a connection is established use

```java-script
conn.send(<data>);
```
to send data to another peer. Any type of data can be used (f.e. objects, strings, blobs, and more).

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)