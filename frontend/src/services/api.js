const configuredBaseUrl = import.meta.env.VITE_API_URL || "/api";
const baseUrl = configuredBaseUrl.replace(/\/+$/, "");

export class ApiError extends Error {
  constructor(message, { status, data = null } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

function buildUrl(path, params) {
  const normalizedPath = String(path).replace(/^\/+/, "");
  const url = new URL(`${baseUrl}/${normalizedPath}`, window.location.origin);

  if (params && typeof params === "object") {
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === null) continue;
      if (Array.isArray(value)) {
        value.forEach((entry) => url.searchParams.append(key, String(entry)));
      } else {
        url.searchParams.set(key, String(value));
      }
    }
  }

  if (url.origin !== window.location.origin) {
    return url.href;
  }

  return `${url.pathname}${url.search}${url.hash}`;
}

async function readResponse(response) {
  if (response.status === 204) {
    return null;
  }

  const responseText = await response.text();
  if (!responseText) {
    return null;
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    try {
      return JSON.parse(responseText);
    } catch {
      throw new ApiError("O serviço retornou uma resposta JSON inválida.", {
        status: response.status,
      });
    }
  }

  return responseText;
}

async function request(path, options = {}) {
  const { body, headers: requestHeaders, params, ...requestOptions } = options;
  const headers = new Headers(requestHeaders);
  const hasBody = body !== undefined && body !== null;
  const isFormData = typeof FormData !== "undefined" && body instanceof FormData;
  let requestBody = body;

  if (hasBody && !isFormData && typeof body !== "string") {
    headers.set("Content-Type", "application/json");
    requestBody = JSON.stringify(body);
  }

  const response = await fetch(buildUrl(path, params), {
    ...requestOptions,
    method: options.method ?? (hasBody ? "POST" : "GET"),
    headers,
    body: requestBody,
    credentials: options.credentials ?? "include",
  });
  const data = await readResponse(response);

  if (!response.ok) {
    const message = data && typeof data === "object"
      ? data.message ?? data.mensagem ?? data.error
      : null;
    throw new ApiError(
      typeof message === "string" && message
        ? message
        : `A solicitação falhou com o status ${response.status}.`,
      { status: response.status, data },
    );
  }

  return data;
}

const api = {
  request,
  get: (path, options = {}) => request(path, { ...options, method: "GET" }),
  post: (path, body, options = {}) => request(path, { ...options, method: "POST", body }),
  put: (path, body, options = {}) => request(path, { ...options, method: "PUT", body }),
  patch: (path, body, options = {}) => request(path, { ...options, method: "PATCH", body }),
  delete: (path, options = {}) => request(path, { ...options, method: "DELETE" }),
};

export default api;
