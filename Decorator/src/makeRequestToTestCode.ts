import axios, { AxiosRequestConfig } from 'axios';

interface RequestOptions {
  url: string;
  useBasicAuth: boolean;
  username?: string;
  password?: string;
  addHeader: boolean;
  wantsTo?: string;
}

async function makeRequest(options: RequestOptions) {
  const { url, useBasicAuth, username, password, addHeader, wantsTo } = options;

  const config: AxiosRequestConfig = {
    method: 'get',
    url: url,
  };

  if (useBasicAuth && username && password) {
    const token = Buffer.from(`${username}:${password}`).toString('base64');
    config.headers = {
      ...config.headers,
      'Authorization': `Basic ${token}`
    };
  }

  if (addHeader && wantsTo) {
    config.headers = {
      ...config.headers,
      'wants-to': wantsTo
    };
  }

  try {
    const response = await axios(config);
    console.log(response.data);
  } catch (error) {
    console.error('Error making request:', error);
  }
}

const problmaticRoutes: RequestOptions[] = [
  // Problematic Controller
  {
    url: 'http://localhost:3000/no-code-pattern-1',
    useBasicAuth: false,
    addHeader: false,
  },

  // [Basic Auth] Controller
  {
    url: 'http://localhost:3000/no-code-pattern-2',
    useBasicAuth: true,
    username: 'secret@gmail.com',
    password: '1234',
    addHeader: false,
  },

  // [Custom Has Permission] Controller
  {
    url: 'http://localhost:3000/no-code-pattern-3',
    useBasicAuth: true,
    username: 'secret@gmail.com',
    password: '1234',
    addHeader: true,
    wantsTo: 'recive hello world'
  },

  // // [Basic Auth] [Has Permission] Controller
  // {
  //   url: 'http://localhost:3000/no-code-pattern-4',
  //   useBasicAuth: true,
  //   username: 'secret@gmail.com',
  //   password: '1234',
  //   addHeader: true,
  //   wantsTo: 'recive hello world'
  // },
];

const decoratedRoutes: RequestOptions[] = [
  // Decorator Pattern Controllers
  {
    url: 'http://localhost:3000/decorator-1',
    useBasicAuth: false,
    addHeader: false,
  },
  {
    url: 'http://localhost:3000/decorator-2',
    useBasicAuth: true,
    username: 'secret@gmail.com',
    password: '1234',
    addHeader: false,
  },
  { // Essa sempre retorna erro 500
    url: 'http://localhost:3000/decorator-3',
    useBasicAuth: true,
    username: 'secret@gmail.com',
    password: '1234',
    addHeader: true,
    wantsTo: 'recive hello world'
  },
  {
    url: 'http://localhost:3000/decorator-4',
    useBasicAuth: true,
    username: 'secret@gmail.com',
    password: '1234',
    addHeader: true,
    wantsTo: 'recive hello world'
  }
];

async function makeSequentialRequests(requestOptionsArray: RequestOptions[]) {
  for (const options of requestOptionsArray) {
    await makeRequest(options);
  }
}

// Testar se está funcionando
// makeRequest({ url: 'http://localhost:3000/', useBasicAuth: false, addHeader: false });

// Rewuest da solução sem decorador
// makeSequentialRequests(problmaticRoutes);

// Rewuest da solução com decorador
makeSequentialRequests(decoratedRoutes);

