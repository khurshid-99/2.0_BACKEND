/**

export async function registerController(req, res, next) {
  try {
    throw new Error("Encounter an error while registering new user.");
  } catch (error) {
    next(error);
  }
}

*/

/**

export async function registerController(req, res, next) {
  try {
    throw new Error("Password is too weak.");
  } catch (error) {
    error.status = 400;
    next(error);
  }
}

*/

/**

export async function registerController(req, res, next) {
  try {
    throw new Error("User already exists.");
  } catch (error) {
    error.status = 409;
    next(error);
  }
}

*/

/**

export async function registerController(req, res, next) {
  try {
    throw new Error("User not defined.");
  } catch (error) {
    error.status = 500;
    next(error);
  }
}

*/

/**
 * validation start for hear
 */

export async function registerController(req, res, next) {
  res.status(201).json({
    message: "User register successfully",
  });
}

