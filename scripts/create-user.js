use admin;
var isMaster = false;
print("Waiting node to become primary");
while(!isMaster){
	isMaster = db.isMaster().ismaster;
}
admin = db.getSiblingDB("admin");
user = {
	user: "admin",
	pwd: "admin",
	roles: [{ role: "userAdminAnyDatabase", db: "admin" },{ role: "clusterAdmin", db: "admin" }]
};
admin.createUser(user);