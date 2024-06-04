const { Pool } = require('pg');


// ## 쿼리 로그

const originalQuery = Pool.prototype.query;

// Pool의 query 메서드를 오버라이드하여 쿼리 실행 시간을 측정하고 로깅
Pool.prototype.query = function (queryText, values, callback) {
  const start = Date.now(); // 현재 시간

  // 기존의 query 메서드를 호출하여 쿼리를 실행하고 그 결과를 queryResult에 저장
  const queryResult = originalQuery.apply(this, [queryText, values]);

  // 콜백함수 제공된 경우
  if (typeof callback === 'function') {
    queryResult.then(res => {
      const duration = Date.now() - start;  // 쿼리 실행 시간 계산
      console.log('Executed query:', { queryText, duration, rows: res ? res.rows.length : 0 });
      callback(null, res);
    }).catch(err => {
      callback(err, null);
    });
  } else {
    queryResult.then(res => {
      const duration = Date.now() - start;  // 쿼리 실행 시간 계산
      console.log('Executed query:', { queryText, duration, rows: res ? res.rows.length : 0 });
    }).catch(err => {
      console.error('Error executing query:', err);
    });
  }

  return queryResult;
};


// 쿼리 로그 ##



const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '1234',
  port: 5432, // PostgreSQL 기본 포트
});



pool.connect(err => {
    if(err) console.log(err);
    else console.log('DB 접속 성공');
});
module.exports = pool;
