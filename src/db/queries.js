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
const getUsers = async (user_seq_no, email, user_nm, social_type, social_id) => {
  try {
    let queryText = 'SELECT * FROM users WHERE 1 = 1';

    // 매개변수가 주어진 경우에만 해당 조건을 추가
    if (user_seq_no !== undefined) { queryText += ` AND user_seq_no = $1`; }
    if (email !== undefined) { queryText += ` AND email = $${queryText.split('$').length}`; }
    if (user_nm !== undefined) { queryText += ` AND user_nm = $${queryText.split('$').length}`; }
    if (social_type !== undefined) { queryText += ` AND social_type = $${queryText.split('$').length}`; }
    if (social_id !== undefined) { queryText += ` AND social_id = $${queryText.split('$').length}`; }

    // 쿼리 실행
    const result = await pool.query(queryText, [user_seq_no, email, user_nm, social_type, social_id].filter(param => param !== undefined));

    // 결과 반환
    return result.rows;
  } catch (error) {
    return null;
  }
};

// 사용자 등록
const createUser = async (email, user_nm, social_type, social_id) => {
  try {
    // INSERT 쿼리 텍스트
    const queryText = `INSERT INTO users (user_seq_no, email, user_nm,  social_type, social_id) VALUES (NEXTVAL('sq_users'), $1, $2, $3, $4)`;
    // 쿼리 실행
    await pool.query(queryText, [email, user_nm, social_type, social_id]);

    // INSERT 결과
    const userInfo = await getUsers(undefined, email, user_nm, social_type, social_id);
    return { result: true , userInfo: userInfo[0]};
  } catch (error) {
    return { result: false, userInfo : null };
  }
};


// users ##



// ## memory
const getMemory = async (memory_seq_no, memory_code_seq_no, user_seq_no, memory_nm, symbol_color_code, is_active) => {
  try {
    let queryText = 'SELECT * FROM memory WHERE 1 = 1';

    // 매개변수가 주어진 경우에만 해당 조건을 추가
    if (memory_seq_no !== undefined) { queryText += ` AND memory_seq_no = $1`; }
    if (memory_code_seq_no !== undefined) { queryText += ` AND memory_code_seq_no = $${queryText.split('$').length}`; }
    if (user_seq_no !== undefined) { queryText += ` AND user_seq_no = $${queryText.split('$').length}`; }
    if (memory_nm !== undefined) { queryText += ` AND memory_nm = $${queryText.split('$').length}`; }
    if (symbol_color_code !== undefined) { queryText += ` AND symbol_color_code = $${queryText.split('$').length}`; }
    if (is_active !== undefined) { queryText += ` AND is_active = $${queryText.split('$').length}`; }

    // 쿼리 실행
    const result = await pool.query(queryText, [memory_seq_no, memory_code_seq_no, user_seq_no, memory_nm, symbol_color_code, is_active].filter(param => param !== undefined));

    // 결과가 정확히 하나인지 확인하고, 그렇지 않으면 오류 발생
    if (result.rows.length < 1) {
      return null;
    } 

    return result.rows[0];

  } catch (error) {
    throw error;
  }
};


// memory ##


module.exports = {
  getTests, createTest,
  getUsers, createUser,
  getMemory
};
