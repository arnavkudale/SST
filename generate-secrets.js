import crypto from 'crypto';

function generateSecureSecret(length = 64) {
  return crypto.randomBytes(length).toString('hex');
}

const jwtSecret = generateSecureSecret();
const csrfSecret = generateSecureSecret();

console.log('Generated Secrets:');
console.log('JWT_SECRET:', jwtSecret);
console.log('CSRF_SECRET:', csrfSecret); 