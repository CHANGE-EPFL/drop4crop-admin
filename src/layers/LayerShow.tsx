import {
    BooleanField,
    DateField,
    ReferenceField,
    Show,
    SimpleShowLayout,
    TextField,
} from "react-admin";
import { Typography } from '@mui/material';

export const LayerShow = () => {
    return (
        <Show >
            <SimpleShowLayout>
                <TextField source="id" />
                <ReferenceField source="style_id" reference="styles" >
                    <TextField source="name" />
                </ReferenceField>
                <TextField source="layer_name" />
                <TextField source="filename" />
                <TextField source="crop" />
                <TextField source="water_model" />
                <TextField source="climate_model" />
                <TextField source="scenario" />
                <TextField source="variable" />
                <TextField source="year" />
                <BooleanField source="enabled" />
            </SimpleShowLayout>
        </Show>
    )
};

export default LayerShow;
