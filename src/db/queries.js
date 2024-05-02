const pool = require('./dbConfig');

// ## test
const getTests = async () => {

    try {
        const tests = await pool.query('SELECT * FROM test');
        console.log(tests);
        return tests.rows;
      } catch (error) {
        console.error('Error executing query:', error);
        throw error;
      }
};

const createTest= async (name) => {
  try {
    await pool.query('INSERT INTO test (test_seq_no, test_nm) VALUES (nextval($1), $2)', ['sq_test', name]);
    return { success: true, message: 'test created successfully' };
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};
// test ##


module.exports = {
    getTests,
    createTest
};
