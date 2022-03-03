
var JDBC = require('jdbc');
var jinst = require('jdbc/lib/jinst');

if (!jinst.isJvmCreated()) {
    jinst.addOption("-Xrs");
    jinst.setupClasspath(['/home/machbase/machbase_home/lib/machbase.jar']);
}

var config = {
    url :'jdbc:machbase://localhost:5656/mhdb',
    drivername: 'com.machbase.jdbc.MachDriver',
    minpoolsize: 10,
    maxpoolsize: 100,
    user: 'SYS',
    password: 'MANAGER',
    properties: {}
};

var machdb = new JDBC(config);

machdb.initialize(function(err) {
    if (err) {
        console.log(err);
    }
});

machdb.reserve(function(err, connObj) {
    var conn = connObj.conn;
    conn.createStatement(function(err, statement) {
        if (err) {
            callback(err);
        } else {
            statement.executeQuery("SELECT * FROM v$tables limit 3;", function(err, resultset) {
                if (err) {
                    callback(err)
                } else {
                    // Convert the result set to an object array.
                    resultset.toObjArray(function(err, results) {
                        if (results.length > 0) {
                            console.log(results);
                        }
                    });
                }
            });
        }
    });
});

