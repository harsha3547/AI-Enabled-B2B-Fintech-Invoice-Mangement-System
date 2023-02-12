import React from 'react'
import {TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import api from './AxiosInstance';

const useStyles = makeStyles({
    inputArea:{
        backgroundColor:'#fff'
   }
})
function SerachField(props) {
    const { setData }=props 
    const classes = useStyles()

    const handleSearchField = e => {
        const { value } = e.target
        api.get(`/SearchFieldServlet?custNumber=${value}`)
        .then(Response => setData(Response.data))
    }
  return (
     <>
        <TextField
            variant="filled"
            label="Search Customer Id"
            className = {classes.inputArea}
            size="small"
            onChange={handleSearchField}
        />
        
    </>
  )
}

export default SerachField