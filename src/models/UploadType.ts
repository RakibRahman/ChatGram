import { UploadTask } from 'firebase/storage';

export type ACTIONTYPE =
    | { type: 'isUploading'; payload: boolean }
    | { type: 'progress'; payload: number }
    | { type: 'file'; payload: File }
    | { type: 'downloadLink'; payload: string }
    | { type: 'uploadTask'; payload: any }
    | { type: 'cancelUpload' }
    | { type: 'getFullPath'; payload: string };

export interface FileUploadStateProps {
    uploading: boolean;
    progress: number;
    downloadURL: string;
    file: File | null;
    uploadTask: UploadTask | null;
    fullPath: string;
}
