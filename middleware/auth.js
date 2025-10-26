const auth = (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token || token !== 'secrettoken123') {
      return res.status(401).json({ message: 'Unauthorized. Please provide a valid token.' });
    }
  
    next();
  };
  
export default auth;
  