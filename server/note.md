## To start using express in Nodejs

1.

```
npm init -y
```

Initialize a new nodejs projects with default setting
Generates package.json file with basic information about the project

2.

```
npm i express
```

Install the express package the nodejs project

3.

```
npm i --save-dev nodemon
```

Install the nodemon package as a development dependency to the nodejs project.
The package automatically monitor your changes and restart the server when needed

4.

```
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "devStart": "nodemon server.js"
  }
```

Add the devStart line in script to run with nodemon.

Server Side Rendering

## Running MongoDB Database:

To run MongoDB (i.e. the mongod process) as a macOS service, run:

```
brew services start mongodb-community@7.0
```

stop:

```
brew services stop mongodb-community@7.0
```

show database

```
show dbs
```

use db

```
use db
```

see stats

```
db.stats()
```

drop

```
db.dropDatabase()
```
