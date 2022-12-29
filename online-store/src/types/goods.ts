export interface ICheckboxFiltersData {
  title: string;
  data: ICheckboxFilterData[];
}

interface ICheckboxFilterData {
  id: number;
  name: string;
  totalCount: number;
  selectedCount: number;
}

export interface ICheckboxItemData {
  data: { id: number; name: string; totalCount: number; selectedCount: number };
  checked: boolean;
  onChangeHandler: (value: string, isChecked: boolean) => void;
}

export interface IDualFilterData {
  title: string;
  min: number;
  max: number;
  sign?: boolean;
}

export interface IGoodsCardData {
  title: string;
  description: string;
  price: number;
  rating: number;
  thumbnail: string;
}

export interface IGoodsListProps {
  layout: string;
}

export interface IGoodsCardProps {
  data: IGoodsCardData;
  layout: string;
}
