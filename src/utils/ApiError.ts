export class ApiError extends Error {
  status: number;
  statusMessage: string;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.statusMessage = status.toString().startsWith('4') ? 'fail' : 'error';
  }
}