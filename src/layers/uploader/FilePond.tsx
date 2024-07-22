import React, { useRef } from 'react';
import {
    useAuthProvider,
    useNotify,
    useRefresh,
} from 'react-admin';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

registerPlugin(FilePondPluginFileValidateType);

export const FilePondUploaderList = () => {
    const auth = useAuthProvider();
    const token = auth.getToken();
    const refresh = useRefresh();
    const notify = useNotify();
    const pondRef = useRef(null);

    return (
        <FilePond
            ref={pondRef}
            // Accepts only tif/geotiff
            acceptedFileTypes={['image/tiff', 'image/geotiff']}
            chunkUploads={true}
            onprocessfiles={refresh}
            allowMultiple={true}
            credits={false}
            timeout={200}
            maxParallelUploads={5}
            chunkForce={true}
            allowRevert={false}
            allowRemove={false}
            stylePanelLayout={'compact'}
            server={{
                url: '/api/layers/uploads',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }}
            onerror={(error, file) => {
                console.error("File upload error", error, file);
                if (error.code === 409) {
                    notify(`Layer for '${file.filename}' already exists. Remove it first before uploading a new one`);
                }
                if (error.code === 400) {
                    notify(`Error uploading '${file.filename}'. Check the filename format`);
                }
            }}
            onprocessfile={(error, file) => {
                setTimeout(() => {
                    console.log('remove file');
                    pondRef.current.removeFile(file.id);
                }, 2000);
            }}
            labelIdle={`
            To upload new layers: Drag & Drop your files or
                <span class="filepond--label-action" style="line-height: 1;"> Browse</span>.
                <br/>
                <span style="font-size: 12px;">
                    The filename will be used to interpret the layer properties and must be in the format of:
                    <br/>
                    {crop}_{watermodel}_{climatemodel}_{scenario}_{variable}_{year}.tif (eg. rice_pcr-globwb_miroc5_rcp60_rg_2080)
                </span>
            `}
        />
    );
}
