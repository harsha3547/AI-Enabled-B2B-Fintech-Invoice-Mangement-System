import React from 'react'
import { makeStyles } from '@material-ui/core';
import {Grid, Button, Typography } from '@material-ui/core';
import api from './AxiosInstance';
import GeneralDialogBox from './GeneralComponents/GeneralDialogBox';
const useStyles = makeStyles({
    deleteButton:{
        borderColor: "#fff", 
        color: "#fff",
        borderRadius: "2px", 
        marginTop:"20px",
        width:"99%",
        "&:hover":{
            backgroundColor:"#14AFF1"
        },
        content:{
            '& .MuiTypogrpahy-root.MuiTypography-body1':{
                color:'#fff'
            }
        }
    }
})

function Delete(props) {
    const {openDelete, setOpenDelete, DataGridRow, handleAlertOpen, displayMessage} = props
    const classes = useStyles()

    const deleteMessage = 'Data deleted Successfully'

    const handleDelete = ()=> {
        DataGridRow.forEach((rowId) => {  api.get(`/DeleteServlet?slNo=${rowId}`)
            .then(setOpenDelete(false))
            .then(()=>{
                displayMessage(deleteMessage)
                handleAlertOpen()})
            .catch(error =>{
            console.log(error)
            })})
    }
  return (
    <>
        <GeneralDialogBox
            title = 'Delete Records ?'
            open = {openDelete}
        >
            <Typography style={{color:'#fff'}}>
                Are you sure you want to delete these records[s] ?
            </Typography>
                <Grid container>
                    <Grid item xs={12} sm={12} md={6}>
                        <Button 
                            variant ="outlined" 
                            className = {classes.deleteButton} 
                            onClick = {() => setOpenDelete(false)}>CANCEL
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <Button 
                            variant = "outlined" 
                            onClick = {handleDelete}
                            className = {classes.deleteButton}>DELETE</Button>
                    </Grid>
                </Grid>
                </GeneralDialogBox>
    </>
  )
}

export default Delete