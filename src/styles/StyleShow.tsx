import React from 'react';
import {
    ArrayField,
    Datagrid,
    Show,
    SimpleShowLayout,
    TextField,
    useRecordContext,
} from "react-admin";

// Custom ColorBar component
const ColorBar = () => {
    const record = useRecordContext();
    if (!record || !record.style) return null;
    const style = record.style;

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

export const StyleShow = () => {
    return (
        <Show>
            <SimpleShowLayout>
                <ColorBar />
                <TextField source="name" />
                <ArrayField source="style">
                    <Datagrid bulkActionButtons={false}>
                        <TextField source="value" />
                        <TextField source="red" />
                        <TextField source="green" />
                        <TextField source="blue" />
                        <TextField source="opacity" />
                        <TextField source="label" />
                    </Datagrid>
                </ArrayField>
                {/* Adding the ColorBar component */}
            </SimpleShowLayout>
        </Show>
    );
};

export default StyleShow;
