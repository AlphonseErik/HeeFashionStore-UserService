export interface IUpdateResult {
  isUpdated: boolean;
};

export interface IDeletedResult {
  isDeleted: boolean;
}

export interface IPaginateOption {
  limit: number;
  page: number;
  filter?: any;
  keyword?: string;
}

export interface IPaginateResult {
  docs: object;
  limit: number | undefined;
  total: number;
  page: number;
  pages: number;
}

export interface IChartOptions {
  from: Date;
  to: Date;
  by: string;
}
