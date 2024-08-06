import React from 'react';
import {
    List,
    Datagrid,
    TextField,
    useRecordContext
} from "react-admin";

// Custom ColorBarField component
const ColorBarField = () => {
    const record = useRecordContext();
    if (!record || !record.style) return null;
    const style = record.style;

    return (
        <div style={{ display: 'flex', height: '20px' }}>
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

// Custom component to display min, max and steps values
const MinValueField = () => {
    const record = useRecordContext();
    if (!record || !record.style) return null;
    const minValue = Math.min(...record.style.map(s => s.value));
    return <span>{minValue.toFixed(2)}</span>;
};

const MaxValueField = () => {
    const record = useRecordContext();
    if (!record || !record.style) return null;
    const maxValue = Math.max(...record.style.map(s => s.value));
    return <span>{maxValue.toFixed(2)}</span>;
};

const StepsField = () => {
    const record = useRecordContext();
    if (!record || !record.style) return null;
    const steps = record.style.length;
    return <span>{steps}</span>;
};

export const StyleList = () => {
    return (
        <List storeKey={false}>
            <Datagrid rowClick="show">
                <TextField source="name" />
                <MinValueField label="Min Value" />
                <MaxValueField label="Max Value" />
                <StepsField label="Steps" />
                <ColorBarField label="Style" />
            </Datagrid>
        </List>
    );
};

export default StyleList;
