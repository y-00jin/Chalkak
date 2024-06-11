const { Pool } = require('pg');


// ## 쿼리 로그

const originalQuery = Pool.prototype.query;

Pool.prototype.query = function (queryText, values, callback) {
  const start = Date.now();

  const queryResult = originalQuery.apply(this, [queryText, values]);

  if (typeof callback === 'function') {
    queryResult.then(res => {
      const duration = Date.now() - start;
      console.log('Executed query:', { queryText, duration, rows: res ? res.rows.length : 0 });
      callback(null, res);
    }).catch(err => {
      callback(err, null);
    });
  } else {
    queryResult.then(res => {
      const duration = Date.now() - start;
      console.log('Executed query:', { queryText, duration, rows: res ? res.rows.length : 0 });
    }).catch(err => {
      console.error('Error executing query:', err);
    });
  }

  return queryResult;
};


// 쿼리 로그 ##


// 각자 설정에 맞게 바꿀 것
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '1234',
  port: 5432, // PostgreSQL 기본 포트
});


// DB 연결 확인
pool.connect(err => {
  if (err) console.log(err);
  else console.log('DB 접속 성공');
});


// 시퀀스 생성
async function createSequences() {
  // sq_test 시퀀스 생성
  await pool.query(`
    CREATE SEQUENCE IF NOT EXISTS sq_test
    START 1
    INCREMENT 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
`);

  // sq_users 시퀀스 생성
  await pool.query(`
    CREATE SEQUENCE IF NOT EXISTS sq_users
    START 1
    INCREMENT 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
`);

  // sq_memory_code 시퀀스 생성
  await pool.query(`
    CREATE SEQUENCE IF NOT EXISTS sq_memory_code
    START 1
    INCREMENT 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
`);

  // sq_memory 시퀀스 생성
  await pool.query(`
    CREATE SEQUENCE IF NOT EXISTS sq_memory
    START 1
    INCREMENT 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
`);

  // sq_place 시퀀스 생성
  await pool.query(`
    CREATE SEQUENCE IF NOT EXISTS sq_place
    START 1
    INCREMENT 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
`);

  // sq_place_detail 시퀀스 생성
  await pool.query(`
  CREATE SEQUENCE IF NOT EXISTS sq_place_detail
  START 1
  INCREMENT 1
  NO MINVALUE
  NO MAXVALUE
  CACHE 1;
`);
}

// 테이블 생성
async function createTables() {
  try {

    // test 테이블 생성
    await pool.query(`
      CREATE TABLE IF NOT EXISTS public.test (
        test_seq_no int4 NOT NULL,
        test_nm varchar NOT NULL,
        CONSTRAINT test_pk PRIMARY KEY (test_seq_no)
      );
    `);

    // group_code
    await pool.query(`
      CREATE TABLE IF NOT EXISTS public.group_code (
        group_code varchar(100) NOT NULL,
        group_code_nm varchar(255) NOT NULL,
        CONSTRAINT group_code_pk PRIMARY KEY (group_code)
      );
    `);

    // common_code
    await pool.query(`
      CREATE TABLE IF NOT EXISTS public.common_code (
        common_code varchar(100) NOT NULL,
        group_code varchar(100) NOT NULL,
        common_code_nm varchar(255) NOT NULL,
        common_code_dc varchar(255) NULL,
        CONSTRAINT common_code_pk PRIMARY KEY (common_code),
        CONSTRAINT common_code_fk FOREIGN KEY (group_code) REFERENCES public.group_code(group_code)
      );
    `);

    // users
    await pool.query(`
      CREATE TABLE IF NOT EXISTS public.users (
        user_seq_no int4 NOT NULL,
        email varchar(255) NOT NULL,
        user_nm varchar(20) NOT NULL,
        social_type varchar(20) NOT NULL,
        social_id varchar(255) NOT NULL,
        CONSTRAINT users_pk PRIMARY KEY (user_seq_no)
      );
    `);


    // memory_code
    await pool.query(`
      CREATE TABLE IF NOT EXISTS public.memory_code (
        memory_code_seq_no int4 NOT NULL,
        memory_code varchar(100) NOT NULL,
        memory_nm varchar(255) NOT NULL,
        CONSTRAINT memory_code_pk PRIMARY KEY (memory_code_seq_no)
      );
    `);

    // memory
    await pool.query(`
      CREATE TABLE IF NOT EXISTS public.memory (
        memory_seq_no int4 NOT NULL,
        memory_code_seq_no int4 NOT NULL,
        user_seq_no int4 NOT NULL,
        symbol_color_code varchar(100) NULL,
        is_active bool NOT NULL DEFAULT false,
        CONSTRAINT memory_pk PRIMARY KEY (memory_seq_no),
        CONSTRAINT memory_fk FOREIGN KEY (memory_code_seq_no) REFERENCES public.memory_code(memory_code_seq_no),
        CONSTRAINT memory_fk_1 FOREIGN KEY (user_seq_no) REFERENCES public.users(user_seq_no)
      );
    `);


    // place
    await pool.query(`
      CREATE TABLE IF NOT EXISTS public.place (
        place_seq_no int4 NOT NULL,
        memory_code_seq_no int4 NOT NULL,
        user_seq_no int4 NOT NULL,
        place_id varchar(100) NOT NULL,
        place_nm varchar(255) NOT NULL,
        place_category_code varchar(100) NULL,
        address varchar(500) NOT NULL,
        place_url text NULL,
        longitude numeric(10, 6) NOT NULL,
        latitude numeric(10, 6) NOT NULL,
        place_alias varchar(255) NOT NULL,
        notes text NULL,
        storage_category varchar(100) NOT NULL,
        edit_restrict bool NOT NULL,
        memory_date date NULL,
        CONSTRAINT place_pk PRIMARY KEY (place_seq_no),
        CONSTRAINT place_fk FOREIGN KEY (memory_code_seq_no) REFERENCES public.memory_code(memory_code_seq_no),
        CONSTRAINT place_fk_1 FOREIGN KEY (user_seq_no) REFERENCES public.users(user_seq_no)
      );
    `);

    // place
    await pool.query(`
          CREATE TABLE IF NOT EXISTS public.place_detail (
	place_detail_seq_no int4 NOT NULL,
	place_seq_no int4 NOT NULL,
	user_seq_no int4 NOT NULL,
	place_detail_content text NOT NULL,
	create_dt timestamp NOT NULL,
	CONSTRAINT place_detail_pk PRIMARY KEY (place_detail_seq_no),
	CONSTRAINT place_detail_place_fk FOREIGN KEY (place_seq_no) REFERENCES public.place(place_seq_no),
	CONSTRAINT place_detail_users_fk FOREIGN KEY (user_seq_no) REFERENCES public.users(user_seq_no)
);
        `);



    // place_detail
    await pool.query(`
      CREATE TABLE IF NOT EXISTS public.place_detail (
        place_detail_seq_no int4 NOT NULL,
        place_seq_no int4 NOT NULL,
        user_seq_no int4 NOT NULL,
        place_detail_content text NOT NULL,
        create_dt timestamp NOT NULL,
        CONSTRAINT place_detail_pk PRIMARY KEY (place_detail_seq_no),
        CONSTRAINT place_detail_place_fk FOREIGN KEY (place_seq_no) REFERENCES public.place(place_seq_no),
        CONSTRAINT place_detail_users_fk FOREIGN KEY (user_seq_no) REFERENCES public.users(user_seq_no)
      );
    `);

    console.log('테이블 생성 완료');
  } catch (error) {
    console.error('테이블 생성 실패:', error);
  }
}

// 기본 데이터 삽입
async function insertData() {

  // group_code
  await pool.query(`
    INSERT INTO group_code (group_code, group_code_nm)
    VALUES ('COLOR_CODE', '색상 코드')
    ON CONFLICT (group_code) DO NOTHING;
  `);

  await pool.query(`
    INSERT INTO group_code (group_code, group_code_nm)
    VALUES ('PLACE_STORAGE_CATEGORY_CODE', '장소 저장 카테고리 코드')
    ON CONFLICT (group_code) DO NOTHING;
  `);

  // common_code
  const common_code_queries = [
    {
      common_code: 'COLOR_CODE_1',
      group_code: 'COLOR_CODE',
      common_code_nm: '#FF7E7E',
      common_code_dc: '빨간색'
    },
    {
      common_code: 'COLOR_CODE_2',
      group_code: 'COLOR_CODE',
      common_code_nm: '#FFBB00',
      common_code_dc: '주황색'
    },
    {
      common_code: 'COLOR_CODE_3',
      group_code: 'COLOR_CODE',
      common_code_nm: '#FFE400',
      common_code_dc: '노란색'
    },
    {
      common_code: 'COLOR_CODE_4',
      group_code: 'COLOR_CODE',
      common_code_nm: '#BCE55C',
      common_code_dc: '연두색'
    },
    {
      common_code: 'COLOR_CODE_5',
      group_code: 'COLOR_CODE',
      common_code_nm: '#B2CCFF',
      common_code_dc: '소라색'
    },
    {
      common_code: 'COLOR_CODE_6',
      group_code: 'COLOR_CODE',
      common_code_nm: '#002266',
      common_code_dc: '남색'
    },
    {
      common_code: 'COLOR_CODE_7',
      group_code: 'COLOR_CODE',
      common_code_nm: '#E8D9FF',
      common_code_dc: '연보라색'
    },
    {
      common_code: 'COLOR_CODE_8',
      group_code: 'COLOR_CODE',
      common_code_nm: '#FFB2D9',
      common_code_dc: '연핑크색'
    },
    {
      common_code: 'PSCC_1',
      group_code: 'PLACE_STORAGE_CATEGORY_CODE',
      common_code_nm: '저장 장소',
      common_code_dc: '장소 저장 카테고리 : 저장 장소'
    },
    {
      common_code: 'PSCC_2',
      group_code: 'PLACE_STORAGE_CATEGORY_CODE',
      common_code_nm: '추억 장소',
      common_code_dc: '장소 저장 카테고리 : 추억 장소'
    }
  ];
  for (const ccq of common_code_queries) {
    await pool.query(
      `INSERT INTO common_code (common_code, group_code, common_code_nm, common_code_dc)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (common_code) DO NOTHING`,
      [ccq.common_code, ccq.group_code, ccq.common_code_nm, ccq.common_code_dc]
    );
  }

}

(async () => {
  await createSequences();
  await createTables();
  await insertData();
})();

module.exports = pool;
