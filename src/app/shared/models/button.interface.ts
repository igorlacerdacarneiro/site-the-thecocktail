import { ActionType } from "../enums/action-types";

export interface IButton {
  label: string;
  icon?: string;
  action: ActionType;
}
