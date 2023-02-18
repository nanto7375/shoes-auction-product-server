import winston, { format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import moment from 'moment';

const { combine, timestamp, printf } = format;

const getDate = ( format: string ): string => moment().format( format );

// 로거 설정
const logger = winston.createLogger({
  format: combine(
    timestamp({ format: () => moment().toISOString() }), // 타임스탬프 형식 지정 (moment.js)
    printf( ( info ) => `${JSON.stringify({ info, krtimestamp: getDate( 'YYYY-MM-DD HH:mm:ss.SSS' ) })}` ) // 커스텀 포맷
  ),
  transports: [
    new winston.transports.Console(), // 로그
    // 로그 파일 설정
    new DailyRotateFile({
      level: 'info', // 로그 레벨 error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5
      datePattern: 'YYYYMMDD', // 날짜 형식 (moment.js, 대문자)
      dirname: './logs', // default: '.'
      filename: 'user_%DATE%.log', // %DATE% => dataPattern 형식에 따른 날짜
      maxFiles: '1d', // 로그 파일 남길 갯수 또는 일, ex) 2일 => '2d'
    }),
  ],
});

export default logger;
