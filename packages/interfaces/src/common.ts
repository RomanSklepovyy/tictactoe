export interface AnyObject {
  [key: string]: any;
}

export interface Pagination {
  page?: number;
  perPage?: number;
}

export interface ResponseBody {
  comments: string;
  status: number;
  data: AnyObject;
}

export interface ListResponse<T> {
  page: number;
  total: number;
  data: T[];
}
