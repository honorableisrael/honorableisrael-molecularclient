/**
=========================================================
* Agraina React - v3.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2022 (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-select components
import Select from "react-select";

// Agraina React base styles

// Custom styles for SuiSelect
import React from "react";

const SuiSelect = forwardRef(({ size, error, success, ...rest }:any, ref):any => {

  return (
    <Select
      {...rest}
      ref={ref}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
        },
      })}
    />
  );
});

// Setting default values for the props of SuiSelect
SuiSelect.defaultProps = {
  size: "medium",
  error: false,
  success: false,
};

// Typechecking props for the SuiSelect

export default SuiSelect; 
