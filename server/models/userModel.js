const { Pool } = require('pg');

// const PG_URI = 'postgres://qonpawma:jsFbNnPbYbdu5VCqVUsVVC-m7LtafO0Q@mahmud.db.elephantsql.com/qonpawma'
const PG_URI = 'postgres://jxoetwer:kguWxT6-E8nRpcDD8UelJO8HTREraPVh@kashin.db.elephantsql.com/jxoetwer'

const pool = new Pool({
  connectionString: PG_URI
});
  
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};
  