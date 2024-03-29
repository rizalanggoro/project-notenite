const detaBaseUrl = process.env.DETA_BASE_URL ?? "";
const detaApiKey = process.env.DETA_API_KEY ?? "";

const getHeaders = (): Headers => {
  const headers = new Headers();
  headers.append("x-api-key", detaApiKey);
  headers.append("content-type", "application/json");
  return headers;
};

interface GetProps {
  basename: string;
  key: string;
}
const get = (props: GetProps): Promise<Response> => {
  return fetch(`${detaBaseUrl}/${props.basename}/items/${props.key}`, {
    method: "GET",
    headers: getHeaders(),
    cache: "no-store",
  });
};

interface InsertProps {
  basename: string;
  payload: {
    item: Object;
  };
}
const insert = (props: InsertProps) => {
  return fetch(`${detaBaseUrl}/${props.basename}/items`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ ...props.payload }),
    cache: "no-store",
  });
};

interface UpdateProps {
  basename: string;
  key: string;
  payload: {
    set?: Object;
    increment?: Object;
    append?: Object;
    prepend?: Object;
    delete?: Object;
  };
}
const update = (props: UpdateProps) => {
  return fetch(`${detaBaseUrl}/${props.basename}/items/${props.key}`, {
    method: "PATCH",
    headers: getHeaders(),
    body: JSON.stringify({ ...props.payload }),
    cache: "no-store",
  });
};

interface QueryProps {
  basename: string;
  payload: {
    query?: Array<Object>;
    limit?: number;
    last?: string;
    sort?: string;
  };
}
const query = (props: QueryProps) => {
  return fetch(`${detaBaseUrl}/${props.basename}/query`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ ...props.payload }),
    cache: "no-store",
  });
};

interface DeleteProps {
  basename: string;
  key: string;
}
const $delete = (props: DeleteProps) => {
  return fetch(`${detaBaseUrl}/${props.basename}/items/${props.key}`, {
    method: "DELETE",
    headers: getHeaders(),
    cache: "no-store",
  });
};

export const providerDeta = { get, insert, update, query, delete: $delete };
