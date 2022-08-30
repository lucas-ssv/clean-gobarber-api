export default {
  secret: process.env.JWT_SECRET || 'test_secret',
  expiresIn: process.env.JWT_EXPIRES_IN || '365d'
}
