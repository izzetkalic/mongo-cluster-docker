var mongodb1 = "mongo-cnf-1";
var mongodb2 = "mongo-cnf-2";
var mongodb3 = "mongo-cnf-3";
var RS = "cnf-serv";
var port = "27017";
var cfg = {
	"_id": `${RS}`,
	"configsvr": true,
	"protocolVersion": 1,
	"members": [
		{"_id": 100,	"host": `${mongodb1}:${port}`},
		{"_id": 101,	"host": `${mongodb2}:${port}`},
		{"_id": 102,	"host": `${mongodb3}:${port}`}
	]
};
rs.initiate(cfg, { force: true });