    export const verifyAdmin = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || authorization !== 'Bearer admin-secret-key') {
    return res.status(403).json({ success: false, message: 'Access denied' });
  }

  next();
};
