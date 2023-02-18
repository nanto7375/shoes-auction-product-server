export default class ExceptionAttribute {
  private STATUS: number;
  private RESULT_CODE: number;
  private RESULT_MESSAGE: string;

  constructor( status: number, resultCode: number, resultMessage: string ) {
    this.STATUS = status;
    this.RESULT_CODE = resultCode;
    this.RESULT_MESSAGE = resultMessage;
  }

  get status():number {
    return this.STATUS;
  }
  get resultCode():number {
    return this.RESULT_CODE;
  }
  get resultMessage():string {
    return this.RESULT_MESSAGE;
  }
}
