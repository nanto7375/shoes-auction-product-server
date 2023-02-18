import ExceptionAttribute from './attribute.exception';

// 400
export const badRequest = new ExceptionAttribute( 400, 80000, 'Bad request' );
export const badData = new ExceptionAttribute( 400, 80001, 'Invalid data' ); 
export const needUserUuid = new ExceptionAttribute( 400, 80005, 'Need userUuid' ); 
export const upsertFail = new ExceptionAttribute( 400, 80006, 'Upsert fail' );
export const updateFail = new ExceptionAttribute( 400, 80007, 'Update fail' );
export const createFail = new ExceptionAttribute( 400, 80008, 'Create fail' );
export const deleteFail = new ExceptionAttribute( 400, 80009, 'Delete fail' );
export const notFoundData = new ExceptionAttribute( 400, 80100, 'Empty Data' );

// 401
export const unAuthorized = new ExceptionAttribute( 401, 80100, 'Have no authorization' );
export const unAuthorizedToken = new ExceptionAttribute( 400, 80101, 'Unauthorized Token' );

// 404
export const notFoundRoute = new ExceptionAttribute( 404, 80400, 'Not found route' );

// 500
export const ServerErrorForLogout = new ExceptionAttribute( 500, 85001, 'Server Error' );
