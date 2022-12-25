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

export interface IDualFilterData {
  title: string;
  min: number;
  max: number;
  sign?: boolean;
}
