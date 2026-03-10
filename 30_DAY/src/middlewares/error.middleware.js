/**
 * 
 function handleError(err, req, res, next) {
  res.status(500).json({
    message: err.message,
  });
}

 */

/**

function handleError(err, req, res, next) {
  res.status(err.status).json({
    message: err.message,
  });
}

*/

/**

function handleError(err, req, res, next) {
  res.status(err.status).json({
    message: err.message,
    stack: err.stack,
  });
}

*/
import dotenv from "dotenv";
dotenv.config();

function handleError(err, req, res, next) {
  const respons = {
    message: err.message,
  };

  if (process.env.NODE_ENVIRONMENT === "development") {
    respons.stack = err.stack;
  }

  res.status(err.status).json(respons);
}

/**



*/
/**



*/
/**



*/
/**



*/
/**



*/

export default handleError;
