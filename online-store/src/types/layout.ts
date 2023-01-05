export interface ILayoutItemProps {
  value: string;
  isChecked: boolean;
  children: JSX.Element;
  onClickHandler: (value: string) => void;
}
