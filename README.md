# mongo-cluster-docker

This is a fork of the simple 3 node replica mongodb setup that is located in [this](https://github.com/senssei/mongo-cluster-docker) project and it is created to activate access control.

For details description, steps and discussion go to:

1. https://warzycha.pl/mongo-db-sharding-docker-example/
2. https://warzycha.pl/mongo-db-shards-by-location/

# Before Starting

Open `/scripts/create-user.js` and change user informations as you like. After that you should change `db.auth()` in the `/scripts/shard-config.js`. You can propagate users in `create-user.js` but at least one user should be defined with `userAdminAnyDatabase` role in order to activate access control.

## IMPORTANT

The key-file should be recreated and replaced with `/scripts/mongo-keyfile`. You can recreate and give access with the following code;

```
openssl rand -base64 756 > <path-to-keyfile>
chmod 600 <path-to-keyfile>
chown 999 <path-to-keyfile>
```
chmod is 400 in the original document but should be 600 since we create it outside of the container also run the chown command.

# Run

```
docker-compose -f docker-compose.1.yml -f docker-compose.2.yml  -f docker-compose.cnf.yml -f docker-compose.shard.yml up -d
```

Wait for a while until containers up then execute following file;

```
cd scripts/
./start.sh
```

# Tests
> Manually for the time being

0. Core tests

Basic *replica* test on *rs1* replica set (data nodes), `mongo-1-1`
```js
rs.status();
```

this should return in `members` 3 nodes.

Basic *sharding* test on *router* (mongos), `mongo-router`
```js
sh.status();
```

this should return something similar to:

```
--- Sharding Status --- 
  sharding version: {
	"_id" : 1,
	"minCompatibleVersion" : 5,
	"currentVersion" : 6,
	"clusterId" : ObjectId("587d306454828b89adaca524")
}
  shards:
  active mongoses:
	"3.4.1" : 1
  balancer:
	Currently enabled:  yes
	Currently running:  yes
		Balancer lock taken at Mon Jan 16 2017 22:18:53 GMT+0100 by ConfigServer:Balancer
	Failed balancer rounds in last 5 attempts:  0
	Migration Results for the last 24 hours: 
		No recent migrations
  databases:

```

# Sharding configuration

Connect to 'mongos' router and run `queries/shard-status.js` for shard status.

To establish location based partitioning on it just run `queries/init.js`.

# Issues and limitations

It's sometimes stuck on 'mongo-router         | 2017-01-16T21:29:48.573+0000 W NETWORK  [replSetDistLockPinger] No primary detected for
set cnf-serv'. It's because quite random order in `docker-compose`.

My workaround was just to kill all containers related.

```
docker-compose -f docker-compose.1.yml -f docker-compose.2.yml  -f docker-compose.cnf.yml -f docker-compose.shard.yml rm -f
```

Please pull request. :)

Basically `mongosetup` service is now splitted to multiple `yml` files. :)

# Reference

* http://www.sohamkamani.com/blog/2016/06/30/docker-mongo-replica-set/
* https://github.com/singram/mongo-docker-compose
* http://stackoverflow.com/questions/31138631/configuring-mongodb-replica-set-from-docker-compose
* https://gist.github.com/garycrawford/0a45f820e146917d231d
* http://stackoverflow.com/questions/31746182/docker-compose-wait-for-container-x-before-starting-y
* https://docs.docker.com/compose/startup-order/
* http://stackoverflow.com/questions/31138631/configuring-mongodb-replica-set-from-docker-compose
* https://github.com/soldotno/elastic-mongo/blob/master/docker-compose.yml

* https://towardsdatascience.com/how-to-deploy-a-mongodb-replica-set-using-docker-6d0b9ac00e49
* https://docs.mongodb.com/manual/tutorial/deploy-sharded-cluster-with-keyfile-access-control/

See more @ `ENV.md`

MIT @ `LICENSE`
