const conn = require('../config/db.config');
const fs = require('fs');

async function install() {
    const queryfile = __dirname + "/sql/initial-queries.sql";

    let queries = [];
    let templine = "";
    let finalmessage = {};

    const lines = fs.readFileSync(queryfile, "utf-8").split("\n");

    try {
        await new Promise((resolve, reject) => {
            lines.forEach((line) => {
                
                if (line.trim().startsWith("--") || line.trim() === "") {
                    return;
                }
                templine += line;
                if (templine.endsWith(";")) {
                    queries.push(templine);
                    templine = "";
                }
            });

            // Check if there is any remaining incomplete query
            if (templine.trim() !== "") {
                queries.push(templine);
            }

            if (queries.length === 0) {
                reject("No queries found in the file");
            } else {
                resolve("All queries are added to the array");
            }
        });

        for (let i = 0; i < queries.length; i++) {
            try {
                const result = await conn.query(queries[i]);
                console.log("Table created");
            } catch (error) {
                finalmessage.message = `Error in creating table ${error}`;
                break; // Exit the loop if there's an error
            }
        }

        if (finalmessage.message) {
            finalmessage.status = 500;
        } else {
            finalmessage.status = 200;
            finalmessage.message = "Tables created successfully";
        }
    } catch (error) {
        finalmessage.status = 500;
        finalmessage.message = error;
    }

    return finalmessage;
}

module.exports = {install};