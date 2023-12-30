import { Box } from '@mui/material'
import React from 'react'

const PageBody = (props: any) => {
  return (
    <Box
    sx={{
      backgroundColor: "#fff",
      width: "95%",
      height: "96.4%",
      margin: "0 auto",
      borderTopRightRadius: "24px",
      borderTopLeftRadius: "24px",
      padding: "37px",
    }}
  >
    {props.children}
  </Box>
  )
}

export default PageBody