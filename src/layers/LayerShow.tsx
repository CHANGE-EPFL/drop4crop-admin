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
                <TextField source="layer_name" />
                <TextField source="crop" />
                <TextField source="water_model" />
                <TextField source="climate_model" />
                <TextField source="scenario" />
                <TextField source="variable" />
                <TextField source="year" />
                <BooleanField source="enabled" />
                <hr />
                <Typography variant="h6">Geoserver properties</Typography>
                <DateField
                    source="created_at"
                    label="Date created"
                    showTime
                />
                <ReferenceField
                    label="Style"
                    source="style_name"
                    reference="styles"
                    link="show"
                >
                    <TextField source="name" />
                </ReferenceField>
            </SimpleShowLayout>
        </Show>
    )
};

export default LayerShow;
