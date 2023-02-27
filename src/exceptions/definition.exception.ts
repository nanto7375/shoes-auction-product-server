import ExceptionAttribute from './attribute.exception';

// 400
export const badRequest = new ExceptionAttribute( 400, 20000, 'Bad request' );
export const badData = new ExceptionAttribute( 400, 20001, 'Invalid data' ); 
export const needUserUuid = new ExceptionAttribute( 400, 20005, 'Need userUuid' ); 
export const upsertFail = new ExceptionAttribute( 400, 20006, 'Upsert fail' );
export const updateFail = new ExceptionAttribute( 400, 20007, 'Update fail' );
export const createFail = new ExceptionAttribute( 400, 20008, 'Create fail' );
export const deleteFail = new ExceptionAttribute( 400, 20009, 'Delete fail' );
export const notFoundData = new ExceptionAttribute( 400, 20100, 'Empty Data' );

// 401
export const unAuthorized = new ExceptionAttribute( 401, 20100, 'Have no authorization' );
export const unAuthorizedToken = new ExceptionAttribute( 400, 20101, 'Unauthorized Token' );

// 404
export const notFoundRoute = new ExceptionAttribute( 404, 20400, 'Not found route' );

// 500
export const ServerErrorForLogout = new ExceptionAttribute( 500, 25001, 'Server Error' );
