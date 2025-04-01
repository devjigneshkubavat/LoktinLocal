import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

interface BaseAxiosOptions {
  timeout?: number;
}

interface ExecuteRequestOptions {
  query?: Record<string, any>; // Query parameters
  headers?: Record<string, string>; // Additional headers
}

// Create an Axios instance with default headers and timeout
function baseAxios(options: BaseAxiosOptions): AxiosInstance {
  const defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  return axios.create({
    baseURL: "https://api.loktin.app/", // Set your baseURL here
    timeout: options.timeout || 30000,
    headers: defaultHeaders,
  });
}
function handleResponse<T>(response: AxiosResponse<T>): T {
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(`Unexpected response status: ${response.status}`);
  }
}
function handleError(error: any): never {
  if (axios.isAxiosError(error)) {
    // Axios specific errors
    console.log(error);

    if (error.response) {
      // Server responded with a status other than 2xx
      throw new Error(
        `Error ${error.response.status}: ${
          error.response.data.message || "Unknown error"
        }`
      );
    } else if (error.request) {
      // No response from server
      throw new Error("No response received from the server");
    } else {
      // Error setting up the request
      throw new Error(`Request setup error: ${error.message}`);
    }
  } else {
    // Non-Axios errors
    throw new Error(`Unexpected error: ${error.message}`);
  }
}

// Executes the HTTP request with error handling
function executeRequest<T>(
  method: "get" | "post" | "put" | "delete",
  pathname: string,
  data?: any,
  options: ExecuteRequestOptions = {}
): Promise<T> {
  const body = method === "get" || !data ? {} : { data };
  const timeout =
    typeof options.headers?.timeout === "number"
      ? options.headers.timeout
      : 30000;

  const reqObj: AxiosRequestConfig = {
    method,
    url: pathname,
    params: options.query,
    headers: options.headers,
    ...body,
  };

  const baseAxiosRequest = baseAxios({ timeout });
  return baseAxiosRequest
    .request<T>(reqObj)
    .then(handleResponse)
    .catch(handleError);
}

export default {
  get<T>(pathname: string, options?: ExecuteRequestOptions): Promise<T> {
    return executeRequest<T>("get", pathname, null, options);
  },

  post<T>(
    pathname: string,
    data?: any,
    options?: ExecuteRequestOptions
  ): Promise<T> {
    return executeRequest<T>("post", pathname, data, options);
  },

  put<T>(
    pathname: string,
    data?: any,
    options?: ExecuteRequestOptions
  ): Promise<T> {
    return executeRequest<T>("put", pathname, data, options);
  },

  delete<T>(
    pathname: string,
    data?: any,
    options?: ExecuteRequestOptions
  ): Promise<T> {
    return executeRequest<T>("delete", pathname, data, options);
  },

  all(promises: Promise<any>[]): Promise<any[]> {
    return axios.all(promises);
  },
};
