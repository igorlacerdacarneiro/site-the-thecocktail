import { IButton } from './button.interface';

export interface IHeaderOptions {
  title: string;
  subtitle?: string;
  titleColor: string;
  hideBackButton?: boolean;
  buttons?: IButton[];
}
