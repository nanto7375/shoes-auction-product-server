import ExceptionAttribute from './attribute.exception';

class ErrorException extends Error {
  status:number;
  resultCode: number;
  resultMessage: string;

  constructor({ status, resultCode, resultMessage }: ExceptionAttribute, customMessage=null ) {
    super( customMessage || resultMessage );
    this.status = status;
    this.resultCode = resultCode;
    this.resultMessage = customMessage || resultMessage;
  }
}

export default ErrorException;
