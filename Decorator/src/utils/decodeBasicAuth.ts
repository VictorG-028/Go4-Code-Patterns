

export default function decodeBasicAuth(authorization: string): [email: string, password: string] {
  // Assumes the authorization header is in the format 'Basic <credentials>'
  const base64Credentials = authorization.split(' ')[1];
  const decodedCredentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
  return decodedCredentials.split(':') as [string, string];
}
