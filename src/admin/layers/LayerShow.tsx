import {
    Show,
    SimpleShowLayout,
    TextField,
} from "react-admin";

export const LayerShow = () => {
    return (
        <Show >
            <SimpleShowLayout>
                <TextField source="id" />
                <TextField source="layer_name" />
                <TextField source="crop" />
                <TextField source="water_model" />
                <TextField source="climate_model" />
                <TextField source="scenario" />
                <TextField source="variable" />
                <TextField source="year" />
            </SimpleShowLayout>
        </Show>
    )
};

export default LayerShow;
