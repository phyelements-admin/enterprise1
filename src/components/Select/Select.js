import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MuiSelect from "@mui/material/Select";
import styled from "@emotion/styled";

const StyledSelect = styled(MuiSelect)(() => ({
  backgroundColor: "white",
  border: "1px solid #E4E4E4",
  boxShadow: "0px 6px 30px rgba(181, 185, 192, 0.1)",
  borderRadius: "4px !important",
}));

const Select = (props) => {
  return (
    <StyledSelect
      autoWidth
      width="100%"
      IconComponent={KeyboardArrowDownIcon}
      MenuProps={{
        PaperProps: {
          sx: {
            maxHeight: "309px",
            width: "310px",
            marginTop: "13px",
            border: "1px solid #E4E4E4",
            p: 1.5,
            pt: 0.75,
            pb: 0,
            boxShadow: "0",
            borderRadius: "4px",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            "&& .Mui-selected": {
              backgroundColor: "#FAFBFD",
              border: "1px solid #E4E4E4",
              "&:hover": {
                backgroundColor: "#FAFBFD",
              },
            },
          },
        },
      }}
      {...props}
    />
  );
};

export default Select;
