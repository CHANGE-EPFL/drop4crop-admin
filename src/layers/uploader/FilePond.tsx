import {
    useAuthProvider,
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

    return (
        <FilePond
            // Accepts only tif/geotiff
            // style={{ height: '500px' }} // Set the height to 300px
            acceptedFileTypes={['image/tiff', 'image/geotiff']}
            chunkUploads={true}
            onprocessfiles={refresh}
            allowMultiple={true}
            credits={false}
            // chunkSize={50000000}
            timeout={200}
            maxParallelUploads={10}
            allowRevert={false}
            allowRemove={false}
            stylePanelLayout={'compact'}
            server={{
                url: '/api/layers/upload',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Transect-Id': "",
                },
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