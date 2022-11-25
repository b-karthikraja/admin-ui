export interface IEditRow {
  data: any,
  handleCheck: any,
  setInputVal: any,
  // editFunction: any, 
  setEdit: (active: boolean) => void;
  isEdit: boolean,
}