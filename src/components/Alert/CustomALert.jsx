import React from "react";
import { Alert, AlertTitle } from "@mui/material";

export default function CustomAlert({
  severity,
  variant,
  alertMessage,
  style,
}) {
  return (
    <Alert severity={severity} variant={variant} sx={style}>
      <AlertTitle sx={{ fontWeight: 600 }}>
        {severity ? severity[0].toUpperCase() + severity.substring(1) : ""}
      </AlertTitle>
      <span style={{ fontSize: "16px", fontWeight: 600 }}>{alertMessage}</span>
    </Alert>
  );
}
