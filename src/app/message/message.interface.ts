export interface Message {
  text: string;
  loading?: boolean;
  action?: () => void;
  denyAction?: () => void;
  acceptText?: string;
  denyText?: string;
}
