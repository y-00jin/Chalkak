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

const createTest = async (name) => {
  try {
    await pool.query('INSERT INTO test (test_seq_no, test_nm) VALUES (nextval($1), $2)', ['sq_test', name]);
    return { success: true, message: 'test created successfully' };
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};
// test ##



// ## users

// 사용자 목록 조회
const getUsers = async (user_seq_no, email, user_name, social_type, social_id) => {
  try {
    let queryText = 'SELECT * FROM users WHERE 1 = 1';

    // 매개변수가 주어진 경우에만 해당 조건을 추가
    if (user_seq_no !== undefined) {
      queryText += ` AND user_seq_no = $1`;
    }
    if (email !== undefined) {
      queryText += ` AND email = $${queryText.split('$').length}`;
    }
    if (user_name !== undefined) {
      queryText += ` AND user_name = $${queryText.split('$').length}`;
    }
    if (social_type !== undefined) {
      queryText += ` AND social_type = $${queryText.split('$').length}`;
    }
    if (social_id !== undefined) {
      queryText += ` AND social_id = $${queryText.split('$').length}`;
    }

    // 쿼리 실행
    const result = await pool.query(queryText, [user_seq_no, email, user_name, social_type, social_id].filter(param => param !== undefined));

    // 결과 반환
    return result.rows;
  } catch (error) {
    return null;
  }
};

// 사용자 등록
const createUser = async (email, user_name, social_type, social_id) => {
  try {
    // INSERT 쿼리 텍스트
    const queryText = `INSERT INTO users (user_seq_no, email, user_name,  social_type, social_id) VALUES (NEXTVAL('sq_users'), $1, $2, $3, $4)`;
    // 쿼리 실행
    await pool.query(queryText, [email, user_name, social_type, social_id]);

    // INSERT 결과
    const userInfo = await getUsers(undefined, email, user_name, social_type, social_id);
    return { result: true , userInfo: userInfo[0]};
  } catch (error) {
    return { result: false, userInfo : null };
  }
};





// users ##


module.exports = {
  getTests, createTest,
  getUsers, createUser
};
