let peer = new Peer(); //generate a peer can connect to other peers and listen for connections
let otherPeerID; //Peer ID from peers to connect to  
let conn;   //the connection between peers

//setup connection
connectionSetup();
//listen for messages from other peer 
peer.on("connection", function(c){
   console.log("connected with:", c.peer);
   //get other PeerID on first connection to establish connection declining if conn is undefined --> if hosting
   if(conn == undefined){
      conn = peer.connect(c.peer);
   }
   //log data send from other peer
   c.on("data", function(data){
      //for adoption: further data/message processing comes here
      console.log("RECEIVED:", data);
   });
   //logs any error from the connection that may occur 
   c.on("error", function(err){console.log(err)});
   //logs if connection is closed 
   c.on("close", function(){console.log("connection is closed")});
   //can send data to other peer with "conn.send(<data>);" any type of data is possible
});
//logs any error from peer that may occur 
peer.on("error", function(err){console.log(err)});
//logs if peer disconnects
peer.on("disconnected", function(){console.log("Peer is disconnected")});


function connectionSetup(){
   let peerID; //own peer ID 
   peer.on('open', function(id) {
      console.log('My peer ID is: ' + id);
      peerID = id;
   });
   //check if host or wants to connect to host 
   //perspective of host
   //for adoption: create possibility of the user to find out his own peer id 
   document.getElementById("hostButton").onclick = function(){
      //show own peer ID
      console.log("Host");
      for (let i = 0; i <= document.getElementById("connInfos").childNodes.length; i++) {
         document.getElementById("connInfos").removeChild(document.getElementById("connInfos").childNodes[0]);
      }
      document.getElementById("connInfos").appendChild(document.createElement("p").appendChild(document.createTextNode(peerID)));
   }
   //perspective of connecting to host 
   //for adoption: create possibility of the user connect to other peer with "peer.connect(<otherPeerID>);""
   document.getElementById("connButton").onclick = function(){
      console.log("Connection");
      for (let i = 0; i <= document.getElementById("connInfos").childNodes.length; i++) {
         document.getElementById("connInfos").removeChild(document.getElementById("connInfos").childNodes[0]);
      }
      //Inputfield to input other peer ID 
      let inputField = document.createElement("INPUT");
      inputField.setAttribute("id", "connIdInput");
      document.getElementById("connInfos").appendChild(inputField);
      //Go Button (press to start connection)
      let goButton = document.createElement("BUTTON");
      goButton.setAttribute("id", "goButton");
      goButton.appendChild(document.createTextNode("Go"))
      document.getElementById("connInfos").appendChild(goButton);
      //get otherPeerID from  input box on button press
      document.getElementById("goButton").onclick = function(){
         otherPeerID = document.getElementById("connIdInput").value;
         console.log(otherPeerID);
         //connect
         conn = peer.connect(otherPeerID);
         conn.on('open', function(){
            conn.send({myPeerID: peerID});
         });
      }
   }   
}


