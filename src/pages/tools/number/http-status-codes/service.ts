import { HttpStatusCode } from './types';

export const HTTP_STATUS_CODES: HttpStatusCode[] = [
  {
    code: 100,
    text: 'Continue',
    description: 'The server has received the request headers and the client should proceed.',
    category: 'Informational'
  },
  {
    code: 101,
    text: 'Switching Protocols',
    description: 'The requester has asked the server to switch protocols.',
    category: 'Informational'
  },
  {
    code: 102,
    text: 'Processing',
    description: 'The server has received and is processing the request (WebDAV).',
    category: 'Informational'
  },
  {
    code: 200,
    text: 'OK',
    description: 'The request succeeded.',
    category: 'Success'
  },
  {
    code: 201,
    text: 'Created',
    description: 'The request succeeded and a new resource was created.',
    category: 'Success'
  },
  {
    code: 202,
    text: 'Accepted',
    description: 'The request has been accepted for processing but is not complete.',
    category: 'Success'
  },
  {
    code: 204,
    text: 'No Content',
    description: 'The server successfully processed the request and is not returning content.',
    category: 'Success'
  },
  {
    code: 206,
    text: 'Partial Content',
    description: 'The server is delivering only part of the resource due to a range header.',
    category: 'Success'
  },
  {
    code: 301,
    text: 'Moved Permanently',
    description: 'The resource has been permanently moved to a new URI.',
    category: 'Redirection'
  },
  {
    code: 302,
    text: 'Found',
    description: 'The resource resides temporarily under a different URI.',
    category: 'Redirection'
  },
  {
    code: 304,
    text: 'Not Modified',
    description: 'The resource has not been modified since the last request.',
    category: 'Redirection'
  },
  {
    code: 307,
    text: 'Temporary Redirect',
    description: 'The request should be repeated with another URI; method must not change.',
    category: 'Redirection'
  },
  {
    code: 308,
    text: 'Permanent Redirect',
    description: 'The resource has permanently moved; method must not change.',
    category: 'Redirection'
  },
  {
    code: 400,
    text: 'Bad Request',
    description: 'The server cannot process the request due to a client error.',
    category: 'Client Error'
  },
  {
    code: 401,
    text: 'Unauthorized',
    description: 'Authentication is required and has failed or not been provided.',
    category: 'Client Error'
  },
  {
    code: 403,
    text: 'Forbidden',
    description: 'The client does not have access rights to the content.',
    category: 'Client Error'
  },
  {
    code: 404,
    text: 'Not Found',
    description: 'The server cannot find the requested resource.',
    category: 'Client Error'
  },
  {
    code: 405,
    text: 'Method Not Allowed',
    description: 'The request method is known but not supported for the resource.',
    category: 'Client Error'
  },
  {
    code: 408,
    text: 'Request Timeout',
    description: 'The server timed out waiting for the request.',
    category: 'Client Error'
  },
  {
    code: 409,
    text: 'Conflict',
    description: 'The request conflicts with the current state of the server.',
    category: 'Client Error'
  },
  {
    code: 410,
    text: 'Gone',
    description: 'The requested content has been permanently deleted.',
    category: 'Client Error'
  },
  {
    code: 415,
    text: 'Unsupported Media Type',
    description: 'The media format of the requested data is not supported.',
    category: 'Client Error'
  },
  {
    code: 422,
    text: 'Unprocessable Entity',
    description: 'The request was well-formed but could not be followed due to semantic errors.',
    category: 'Client Error'
  },
  {
    code: 429,
    text: 'Too Many Requests',
    description: 'The user has sent too many requests in a given amount of time.',
    category: 'Client Error'
  },
  {
    code: 500,
    text: 'Internal Server Error',
    description: 'The server encountered an unexpected condition.',
    category: 'Server Error'
  },
  {
    code: 501,
    text: 'Not Implemented',
    description: 'The server does not support the functionality required.',
    category: 'Server Error'
  },
  {
    code: 502,
    text: 'Bad Gateway',
    description: 'The server received an invalid response from an upstream server.',
    category: 'Server Error'
  },
  {
    code: 503,
    text: 'Service Unavailable',
    description: 'The server is not ready to handle the request (overload or maintenance).',
    category: 'Server Error'
  },
  {
    code: 504,
    text: 'Gateway Timeout',
    description: 'The server did not receive a timely response from an upstream server.',
    category: 'Server Error'
  }
];

export function filterHttpStatusCodes(query: string): HttpStatusCode[] {
  const q = query.trim().toLowerCase();
  if (!q) return HTTP_STATUS_CODES;

  return HTTP_STATUS_CODES.filter((entry) => {
    const haystack = `${entry.code} ${entry.text} ${entry.description} ${entry.category}`.toLowerCase();
    return haystack.includes(q);
  });
}

export function formatHttpStatusCodes(entries: HttpStatusCode[]): string {
  if (entries.length === 0) return 'No matching status codes.';
  return entries
    .map((e) => `${e.code} ${e.text} — ${e.description}`)
    .join('\n');
}
