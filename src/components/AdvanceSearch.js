import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import GeneralTextField from './GeneralComponents/GeneralTextField';
import api from './AxiosInstance';
import GeneralDialogBox from './GeneralComponents/GeneralDialogBox';

const useStyles = makeStyles({
    inputArea:{
        width: "200px",
        height: "50px",
        borderRadius: "5px",
        padding: "8px",
        outline: "none",
        margin: "15px 10px",
        backgroundColor:'#fff'
        
    },
    dialog:{
        backgroundColor:"#273d4a"
    },
    advanceSearchBtn:{
        borderColor: "#fff", 
        color: "#fff",
        borderRadius: "2px",
        marginTop:"20px",
        width:"99%",
        "&:hover":{
            backgroundColor:"#14AFF1"
        }
    },
    heading:{
        color:"#fff",
        fontSize:'20px'
    }
})

function AdvanceSearch(props) {
    const {openAdvanceSearch, handleInputChange, values, setValues, setOpenAdvanceSearch, setData, handleAlertOpen, displayMessage} = props
    const classes = useStyles()

    const searchMessage = 'Finished the Search'

    const handleAdvanceSearch = e => {
            e.preventDefault()
            api.get(`/AdvanceSearch?docId=${values.docId}&invoiceId=${values.invoiceId}&custNumber=${values.custNumber}&buisnessYear=${values.buisnessYear}`)
            .then(Response => setData(Response.data))
            .then(setOpenAdvanceSearch(false))
            .then(()=>{
                displayMessage(searchMessage)
                handleAlertOpen()})
            .then(setValues({
                slNo:0,
                businessCode : '', 
                custNumber : 0,
                clearDate : '',
                buisnessYear : 0,
                docId : '',
                postingDate : '',
                documentCreateDate : '',
                dueInDate : '',
                invoiceCurrency : '',
                documentType : '',
                postingId : 0,
                totalOpenAmount : 0,
                baselineCreateDate : '',
                custPaymentTerms : '',
                invoiceId : 0,
                agingBucket: ''
            }))
            .catch(error =>{
            console.log(error)
            })
    }
  return (
    <>
   <GeneralDialogBox
        title = 'Advance Search'
        open = {openAdvanceSearch}
   >
        <form onSubmit={handleAdvanceSearch}>  
            <Grid container>
                <Grid item md ={6}>
                    <GeneralTextField 
                        name = 'docId' 
                        label = 'Document Id'
                        required = {false}
                        onChange = {handleInputChange} 
                    />
                </Grid>
                <Grid item md ={6} >
                    <GeneralTextField 
                        type='number'
                        name='invoiceId' 
                        label = 'Invoice Id'
                        required = {false}
                        onChange = {handleInputChange}
                    />
                </Grid>
            </Grid>
            <Grid container >
                <Grid item md ={6}>
                    <GeneralTextField 
                        type='number'
                        name = 'custNumber' 
                        label = 'Customer Number'
                        required = {false} 
                        onChange = {handleInputChange} 
                    />
                </Grid>
                <Grid item md ={6}>
                    <GeneralTextField 
                        type="number"
                        name='buisnessYear' 
                        label = 'Business Year'
                        required = {false} 
                        onChange = {handleInputChange} 
                    />
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12} sm={12} md={6}>
                    <Button type="submit" variant = "outlined" className = {classes.advanceSearchBtn}>SEARCH</Button>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Button variant = "outlined" onClick = {() =>setOpenAdvanceSearch(false)} className = {classes.advanceSearchBtn}>CANCEL</Button>
                </Grid>
            </Grid>
        </form>
                    
    </GeneralDialogBox>
    </>
  )
}

export default AdvanceSearch