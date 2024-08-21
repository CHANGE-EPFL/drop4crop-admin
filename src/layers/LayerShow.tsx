import {
    BooleanField,
    DateField,
    ReferenceField,
    Show,
    SimpleShowLayout,
    TextField,
    useRecordContext,
} from "react-admin";
import { Typography } from '@mui/material';

export const ColorBar = () => {
    const record = useRecordContext();
    if (!record || !record.style) return null;
    const style = record.style.style;

    return (
        <div style={{ display: 'flex', height: '20px', marginBottom: '10px' }}>
            {style.map((color, index) => (
                <div
                    key={index}
                    style={{
                        backgroundColor: `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.opacity / 255})`,
                        width: `${100 / style.length}%`
                    }}
                    title={color.label}
                ></div>
            ))}
        </div>
    );
};

export const LayerShow = () => {
    return (
        <Show >
            <SimpleShowLayout>
                <TextField source="id" />
                <ColorBar />
                <ReferenceField source="style_id" reference="styles" link="show">
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
