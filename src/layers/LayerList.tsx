import {
    List,
    Datagrid,
    TextField,
    BooleanField,
    BulkDeleteButton,
    DatagridConfigurable,
    SelectColumnsButton,
    BulkExportButton,
    BulkUpdateButton,
    useGetList,
    Loading,
    Pagination,
    DateField,
    TopToolbar,
    CreateButton,
    ExportButton,
    FilterButton,
} from "react-admin";
import { FilterList, FilterListItem } from 'react-admin';
import { Card, CardContent, Typography } from '@mui/material';
import MailIcon from '@mui/icons-material/MailOutline';
import CategoryIcon from '@mui/icons-material/LocalOffer';
import {
    globalWaterModelsItems,
    climateModelsItems,
    cropItems,
    scenariosItems,
    variablesItems,
    yearItems
} from '../options';
import { Fragment, useState } from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import YardOutlinedIcon from '@mui/icons-material/YardOutlined';
import { FilePondUploaderList } from './uploader/FilePond';

const StyleSelectMenu = () => {
    const [selectedStyle, setSelectedStyle] = useState(null);
    const { data, loading, error } = useGetList('styles');

    if (loading) return <Loading />;
    if (!data) return null;

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedStyle(event.target.value);
    };

    const MenuItems = data.map(style => (
        <MenuItem key={style.id} value={style.id}>
            {style.name}
        </MenuItem>
    ));

    return (
        <>

            <Select
                label="Style"
                value={selectedStyle}
                onChange={handleChange}

            >
                {MenuItems}
            </Select>
            <BulkUpdateButton
                label="Update style"
                mutationMode="pessimistic"
                data={{
                    style_name: selectedStyle
                }} />
        </>
    );
}

const BulkActionButtons = () => {
    // Use the data from the styles endpoint to populate a drop down to
    // use with the BulkUpdateButton
    return (
        <Fragment>
            <BulkUpdateButton
                label="Disable"
                mutationMode="pessimistic"
                data={{ enabled: false }}
            />
            <BulkUpdateButton
                label="Enable"
                mutationMode="pessimistic"
                data={{ enabled: true }}
            />
            <BulkDeleteButton mutationMode="pessimistic" />
            <StyleSelectMenu />
            <BulkExportButton />
            {/* <BulkDeleteButton mutationMode="pessimistic"/> */}
        </Fragment >
    )
};


export const FilterSidebar = () => {
    return (
        <Card sx={{ order: -1, mr: 2, mt: 6, width: 200 }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Filters
                </Typography>

                <FilterList label="Enabled" icon={<CategoryIcon />}>
                    <FilterListItem label="True" value={{ enabled: true }} />
                    <FilterListItem label="False" value={{ enabled: false }} />
                </FilterList>

                <FilterList label="Crop" icon={<CategoryIcon />}>
                    {cropItems.map(item => (
                        <FilterListItem
                            key={item.id}
                            label={item.name}
                            value={{ crop: item.id }}
                        />
                    ))}
                </FilterList>
                <FilterList label="Water model" icon={<MailIcon />}>
                    {globalWaterModelsItems.map(item => (
                        <FilterListItem
                            key={item.id}
                            label={item.name}
                            value={{ water_model: item.id }}
                        />
                    ))}
                </FilterList>
                <FilterList label="Climate model" icon={<CategoryIcon />}>
                    {climateModelsItems.map(item => (
                        <FilterListItem
                            key={item.id}
                            label={item.name}
                            value={{ climate_model: item.id }}
                        />
                    ))}
                </FilterList>
                <FilterList label="Scenario" icon={<CategoryIcon />}>
                    {scenariosItems.map(item => (
                        <FilterListItem
                            key={item.id}
                            label={item.name}
                            value={{ scenario: item.id }}
                        />
                    ))}
                </FilterList>
                <FilterList label="Variable" icon={<CategoryIcon />}>
                    {variablesItems.map(item => (
                        <FilterListItem
                            key={item.id}
                            label={item.name}
                            value={{ variable: item.id }}
                        />
                    ))}
                </FilterList>
                <FilterList label="Year" icon={<CategoryIcon />}>
                    {yearItems.map(item => (
                        <FilterListItem
                            key={item.id}
                            label={item.name}
                            value={{ year: item.id }}
                        />
                    ))}
                </FilterList>

            </CardContent>
        </Card>
    )
};
const ListActions = () => (
    <TopToolbar>
        <SelectColumnsButton />
        <CreateButton />
        <ExportButton />
    </TopToolbar>
);

export const LayerList = () => {

    const PostPagination = props => (
        <Pagination
            rowsPerPageOptions={[10, 25, 50, 100, 250, 500, 1000]}
            {...props}
        />
    );

    return (
        <List
            queryOptions={{ refetchInterval: 5000 }}
            aside={<FilterSidebar />}
            storeKey={false}
            perPage={25}
            pagination={<PostPagination />}
            actions={<ListActions />}
            sort={{ field: 'uploaded_at', order: 'DESC' }}
            empty={false}
        >
            <FilePondUploaderList />
            <DatagridConfigurable
                rowClick="show"
                bulkActionButtons={<BulkActionButtons />}
            >
                <TextField source="crop" />
                <TextField source="water_model" />
                <TextField source="climate_model" />
                <TextField source="scenario" />
                <TextField source="variable" />
                <TextField source="year" />
                <BooleanField source="enabled" />
                <TextField source="style_name" />
                <DateField source="last_updated" showTime />
                <DateField source="uploaded_at" label="Uploaded at (UTC)" showTime />
            </DatagridConfigurable>
        </List>
    );
};

export default LayerList;
