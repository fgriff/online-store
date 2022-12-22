export interface ICheckboxFiltersData {
  title: string;
  data: ICheckboxFilterData[];
}

export interface ICheckboxFilterData {
  id: number;
  name: string;
  totalCount: number;
  selectedCount: number;
}
