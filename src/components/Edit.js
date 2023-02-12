import { makeStyles } from '@material-ui/core'
import React from 'react'
import {Grid, TextField, Button } from '@material-ui/core';
import GeneralDialogBox from './GeneralComponents/GeneralDialogBox';
import api from './AxiosInstance';

const useStyles = makeStyles({

    editCloseBtn:{
        borderColor: "#fff", 
        color: "#fff",
        borderRadius: "5px",
        marginTop:"20px",
        width:"99%",
        "&:hover":{
            backgroundColor:"#14AFF1"
        }
    },
    dialog:{
        backgroundColor:"#273d4a"
    },
    heading:{
        color:"#fff",
        fontSize:"20px"
    },
    item:{
        backgroundColor:"#fff",
        margin:"0px 10px"
    }
})
function Edit(props) {
    const {openEdit, handleInputChange, values, setOpenEdit, DataGridRow, handleAlertOpen, displayMessage} = props
    const classes = useStyles()

    const editMessage = 'Edited Successfully'

    const handleEdit = e => {
        e.preventDefault()
         api.get(`/EditServlet?invoiceCurrency=${values.invoiceCurrency}&custPaymentTerms=${values.custPaymentTerms}&slNo=${DataGridRow}`)
            .then(setOpenEdit(false))
            .then(()=>{
                displayMessage(editMessage)
                handleAlertOpen()})
            .catch(error =>{
            console.log(error)
            })
    }
  return (
    <>
       <GeneralDialogBox
            title='Edit'
            open = {openEdit}
        >
            <form onSubmit={handleEdit}>  
                <Grid container spacing={1}>
                    <Grid item md ={5} className={classes.item} >
                        <TextField
                            name = 'invoiceCurrency' 
                            label = 'Invoice Currency'
                            required
                            autoComplete='off'
                            inputProps={{ maxLength: 5 }}
                            onChange = {handleInputChange} 
                        /> 
                    </Grid>
                    <Grid item md ={5} className={classes.item}>
                        <TextField
                            name='custPaymentTerms' 
                            label = 'CustomerPaymentTerms'
                            autoComplete='off'
                            required 
                            inputProps={{ maxLength: 5 }}
                            onChange = {handleInputChange} 
                            />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} sm={12} md={6}>
                        <Button type="submit" variant = "outlined" className = {classes.editCloseBtn}>EDIT</Button>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Button variant = "outlined" onClick = {() =>setOpenEdit(false)} className = {classes.editCloseBtn}>CANCEL</Button>
                    </Grid>
                </Grid>
            </form>
    
        </GeneralDialogBox>
    </>
  )
}

export default Edit