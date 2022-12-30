export interface ILayoutItemData {
  value: string;
  isChecked: boolean;
  children: JSX.Element;
  onClickHandler: (value: string) => void;
}
