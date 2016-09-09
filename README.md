# Bird Repository
*Bird library (API with MongoDB database). Built using  nodejs, hapijs, mongodb.*

Implementation to problem statement given at : 
https://gist.github.com/sebdah/265f4255cb302c80abd4

Since this service uses node and npm modules. Make sure, you have installed nodejs and npm.

After cloning the repository. change to the directory. And run the following commands.

**Running :** 
`npm i;`
`node index;`

This will start the node server. You can access it at **localhost:27001**.
It connects to mongo at 27017.

open : **localhost:27001/documentation**  for api docs.

To run the test suite :  
`npm test;`

--------------------------------------------------------------------------------
Important decisions regarding design and features (will update as I go): 

 1. *Plugin Based modules* : Allows for asynchronous loading of different  modules. It also allows to make decisions regarding if it is a fatal exception for the application and or can just throw it and continue loading other modules.  Each plugin can also be run on a different port.
 2. *Winston based Logger Utility* : Taking out logger and implementing as a separate utility allows more control over log handling. Right now it is just files and console. But can easily be extended to transport the log to a different service (datadog, logstash) for analysis.
 3. *Interactive Documentation* : The defined endpoints can be taken for a spin from the documentation itself. This is built using swagger and served as a static HTML, JS asset. Fingerprinting is also available(but disabled for local development), so do disable cash for local testing.
 4. *Over ride existing config using external parameters* : Command line arguments could be used to override, the config parameters like which port the application runs on, the connection host url and port for db, etc. 
**note : ** config are loaded in a sorted manner(lexicographically by filename) , that means the contradicting config params loaded later on will override the previously loaded ones.
