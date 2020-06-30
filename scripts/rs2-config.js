var mongodb1 = "mongo-2-1";
var mongodb2 = "mongo-2-2";
var mongodb3 = "mongo-2-3";
var RS = "rs2";
var port = "27017";
var cfg = {
	"_id": `${RS}`,
	"protocolVersion": 1,
	"members": [
		{"_id": 0,	"host": `${mongodb1}:${port}`},
		{"_id": 1,	"host": `${mongodb2}:${port}`},
		{"_id": 2,	"host": `${mongodb3}:${port}`}
	]
};
rs.initiate(cfg, { force: true });