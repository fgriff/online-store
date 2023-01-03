import { IProductsItem } from './products';

export interface ICheckboxFiltersData {
  title: string;
  data: ICheckboxFilterData[];
}

interface ICheckboxFilterData {
  name: string;
  totalCount: number;
  selectedCount: number;
}

export interface ICheckboxItemData {
  data: { name: string; totalCount: number; selectedCount: number };
  isChecked: boolean;
  onChangeHandler: (value: string, isChecked: boolean) => void;
}

export interface IDualFilterData {
  title: string;
  min: number;
  max: number;
  children?: JSX.Element;
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
  data: IProductsItem;
  layout: string;
}
