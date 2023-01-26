import { IProductsItem } from './products';

export interface ICheckboxFiltersProps {
  title: string;
  data: ICheckboxFilterProps[];
}

interface ICheckboxFilterProps {
  name: string;
  totalCount: number;
  selectedCount: number;
}

export interface ICheckboxFilterItemProps {
  data: { name: string; totalCount: number; selectedCount: number };
  isChecked: boolean;
  onChangeHandler: (value: string, isChecked: boolean) => void;
}

export interface IDualFilterProps {
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

export interface IGoodsCardProps {
  data: IProductsItem;
}
