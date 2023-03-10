import { getDownloadURL, ref, uploadBytesResumable, deleteObject } from 'firebase/storage';
import { nanoid } from 'nanoid';
import { useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { storage } from '../../firebase';
import { UserInfo } from '../../models/types';
import { FileUploadStateProps, ACTIONTYPE } from '../../models/UploadType';
import { useEditProfile } from '../EditProfile/useEditProfile';
import { useSentMessage } from '../SentMessage/useSentMessage';

export default function useFireBaseUpload(
    setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>,
    message?: string
) {
    const { chatRoomId } = useParams()!;
    const { lastMessage, sendMessage } = useSentMessage();
    const currentUser: UserInfo = JSON.parse(localStorage.getItem('currentUser')!);
    const { updateUser } = useEditProfile()!;

    const FileUploadState: FileUploadStateProps = {
        uploading: false,
        downloadURL: '',
        progress: 0,
        file: null,
        fullPath: '',
        uploadTask: null,
    };

    function reducer(state: typeof FileUploadState, action: ACTIONTYPE) {
        switch (action.type) {
            case 'isUploading':
                return {
                    ...state,
                    uploading: action.payload,
                };
            case 'progress':
                return { ...state, progress: action.payload };
            case 'file':
                return { ...state, file: action.payload };
            case 'downloadLink':
                return { ...state, downloadURL: action.payload };
            case 'uploadTask':
                return { ...state, uploadTask: action.payload };
            case 'getFullPath':
                return { ...state, fullPath: action.payload };
            case 'cancelUpload':
                return (state = FileUploadState);
            default:
                throw new Error();
        }
    }

    const [state, dispatch] = useReducer(reducer, FileUploadState);

    const handleUpload = (file: File, isProfile?: Boolean) => {
        const storageID = isProfile ? currentUser?.uid : chatRoomId;
        const storageRef = ref(storage, `${storageID}/${nanoid(10)}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        dispatch({ type: 'uploadTask', payload: uploadTask });

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                dispatch({ type: 'isUploading', payload: true });
                dispatch({ type: 'file', payload: file });
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                dispatch({ type: 'progress', payload: Math.round(progress) });
                switch (snapshot.state) {
                    case 'paused':
                        // console.log('Upload is paused');
                        break;
                    case 'running':
                    // console.log('Upload is running');
                }
            },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        // toast({
                        //   title: 'Unauthorized user',
                        //   description: "User doesn't have permission to access the storage",
                        //   status: 'error',
                        // });
                        break;
                    case 'storage/canceled':
                        // toast({
                        //   title: 'Upload is canceled',
                        //   description: 'User canceled the upload',
                        //   status: 'error',
                        // });
                        break;

                    case 'storage/quota-exceeded':
                        // toast({
                        //   title: 'Quota exceeded',
                        //   description: 'User quota exceeded',
                        //   status: 'error',
                        // });
                        break;

                    case 'storage/unknown':
                        // toast({
                        //   title: 'Storage unknown',
                        //   description:
                        //     'Unknown error occurred, inspect error.serverResponse',
                        //   status: 'error',
                        // });
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    dispatch({ type: 'downloadLink', payload: downloadURL });
                    // toast({
                    //   title: 'Uploading Completed',
                    // });
                    // console.log({ message });
                    console.log('Upload completed successfully');
                    const fileType = file.type.replace(/[^/]*$/, '').replace(/[/]/, '');
                    if (!isProfile) {
                        sendMessage(
                            message,
                            fileType,
                            uploadTask.snapshot.ref.fullPath!,
                            downloadURL
                        );
                        lastMessage(message, fileType);
                    }
                    if (isProfile) {
                        updateUser({
                            photoURL: downloadURL,
                            photoURLPath: uploadTask.snapshot.ref.fullPath!!,
                        }).then(() => {
                            console.log('Profile pic updates');
                        });
                    }
                    dispatch({ type: 'isUploading', payload: false });
                    dispatch({
                        type: 'getFullPath',
                        payload: uploadTask.snapshot.ref.fullPath,
                    });

                    // setTimeout(() => {
                    //     setIsOpen(false);
                    // }, 2000);
                    if (setIsOpen) {
                        setIsOpen(false);
                    }
                    console.log('full DL', uploadTask.snapshot.ref.fullPath);
                });
            }
        );
    };

    const cancelUpload = async () => {
        if (state.uploadTask) {
            dispatch({ type: 'cancelUpload' });
            await state.uploadTask.cancel();
        }
        console.log('cancel');
    };

    const discardUpload = async (photURLPath: string) => {
        // Create a reference to the file to delete
        const refPath = photURLPath ? photURLPath : state.fullPath;
        const desertRef = ref(storage, refPath);
        console.log('del path', refPath);
        // Delete the file
        await deleteObject(desertRef)
            .then(() => {
                // toast({
                //   title: 'Successfully deleted',
                //   status: 'success',
                // });.
                console.log('Successfully deleted');
            })
            .catch((error) => {
                // toast({
                //   title: ' Uh-oh, an error occurred!',
                //   status: 'error',
                // });
                console.log(' Uh-oh, an error occurred!');
            });
    };

    return { handleUpload, state, dispatch, cancelUpload, discardUpload };
}
