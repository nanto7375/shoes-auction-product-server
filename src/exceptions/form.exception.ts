import ExceptionAttribute from './attribute.exception';

class ErrorException extends Error {
  status:number;
  resultCode: number;
  resultMessage: string;

  constructor({ status, resultCode, resultMessage }: ExceptionAttribute ) {
    super( resultMessage );
    this.status = status;
    this.resultCode = resultCode;
    this.resultMessage = resultMessage;
  }
}

export default ErrorException;
