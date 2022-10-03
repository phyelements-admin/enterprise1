import { useState } from "react";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { createTheme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import LinearProgress from "@mui/material/LinearProgress";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";

const defaultTheme = createTheme();

const useStyles = makeStyles(
  (theme) => ({
    dataGridRoot: {
      border: "none",
      backgroundColor: "#ffffff",
      overflowX: "hidden !important",
      "& .MuiDataGrid-root": {
        border: "none",
        cursor: "pointer",
      },
      "& .MuiPaper-root": {
        borderRadius: "8px",
      },

      "&>.MuiDataGrid-main": {
        cursor: "pointer",
        border: "none",

        "&>.MuiDataGrid-columnHeaders": {
          borderBottom: "none",
          backgroundColor: "#E4E4E44D",
          "& .MuiDataGrid-columnHeader:first-child": {
            "& .MuiDataGrid-columnHeaderDraggableContainer": {},
          },
          "& .MuiDataGrid-columnHeaderTitleContainer": {
            flex: "none",
          },

          "& .MuiDataGrid-menuIcon": {
            marginLeft: "10px",
          },

          "& .MuiDataGrid-iconButtonContainer": {
            marginLeft: "10px",
          },
        },
        "& .MuiDataGrid-row": {
          "&:nth-child(even)": {
            backgroundColor: "#fafbfd",
          },
        },

        "& div div div div >.MuiDataGrid-cell": {
          borderBottom: "none",
        },
      },
      "& .MuiDataGrid-iconSeparator": {
        display: "none",
      },
    },
    dataGridContainer: {
      height: "100%",
      display: "flex",
    },
    dataGridInnerContainer: {
      flexGrow: 1,
    },
  }),
  { defaultTheme }
);

function CustomNoRowsOverlay(message) {
  return (
    <div item xs={12} style={{ textAlign: "center", paddingTop: "50px" }}>
      <Typography variant="h6" gutterBottom>
        {message}
      </Typography>
    </div>
  );
}

const DataGridTable = ({
  rows,
  columns,
  onMouseEnterRow,
  onMouseLeaveRow,
  onRowClick,
  NoRowsMessage,
  defaultPageSize,
  checkboxSelection,
  loading,
  defaultSorting,
  defaultDetailPanelExpandedRowIds,
  rowsPerPageOptions,
  getDetailPanelHeight,
  getDetailPanelContent,
}) => {
  const [pageSize, setPageSize] = useState(
    defaultPageSize ? defaultPageSize : 10
  );
  const classes = useStyles();
  return (
    <>
      <div className={classes.dataGridContainer}>
        <div className={classes.dataGridInnerContainer}>
          <DataGridPro
            className={classes.dataGridRoot}
            columns={columns}
            rows={rows}
            checkboxSelection={checkboxSelection}
            sx={{ overflowX: "scroll", marginLeft: "0px" }}
            autoHeight
            loading={loading}
            getDetailPanelHeight={getDetailPanelHeight}
            getDetailPanelContent={getDetailPanelContent}
            onRowClick={onRowClick}
            disableSelectionOnClick
            disableColumnSelector
            pagination
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={
              rowsPerPageOptions ? rowsPerPageOptions : [5, 10, 100]
            }
            components={{
              NoRowsOverlay: () => CustomNoRowsOverlay(NoRowsMessage),
              LoadingOverlay: LinearProgress,
              ColumnMenuIcon: FilterListOutlinedIcon,
            }}
            initialState={{
              detailPanel: { expandedRowIds: defaultDetailPanelExpandedRowIds },
              sorting: {
                sortModel: defaultSorting,
              },
            }}
            componentsProps={{
              row: {
                onMouseEnter: onMouseEnterRow,
                onMouseLeave: onMouseLeaveRow,
              },
              pagination: {
                labelRowsPerPage: "Items per page",
              },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default DataGridTable;
