export interface UploadResponse {
  status: boolean;
  message: string;
  statusCode: number;
  data: {
    imageUrl: string;
  };
}
