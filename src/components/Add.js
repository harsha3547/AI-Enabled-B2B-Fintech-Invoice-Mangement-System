import React,{useState} from 'react';
import { Grid , makeStyles, Button } from '@material-ui/core';
import qr from 'qs';
import GeneralTextField from './GeneralComponents/GeneralTextField';
import api from './AxiosInstance';
import GeneralDialogBox from './GeneralComponents/GeneralDialogBox';

const useStyles = makeStyles({

    dialog:{
        backgroundColor:"#273d4a"
    },
    addCloseBtn:{
        borderColor: "#fff",  
        color: "#fff",
        borderRadius: "2px",
        padding: "5px 70px",
        width:"99%",
        "&:hover":{
            backgroundColor:"#14AFF1"
        }
    },
    heading:{
        color:"#fff",
        fontSize:'25px'
    }
})
function Add(props) {
 
    const classes = useStyles()

    const addMessage = 'Data added Successfully'
    
  const { openAdd , setOpenAdd, handleInputChange, values, setValues, displayMessage, handleAlertOpen } = props
  const [ textTypeForClearDate , setTextTypeForClearDate ] = useState('text')
  const [ textTypeForPostingDate , setTextTypeForPostingDate ] = useState('text')
  const [ textTypeForDocument , setTextTypeForDocument ] = useState('text')
  const [ textTypeForDueDate , setTextTypeForDueDate ] = useState('text')
  const [ textTypeForBaseline , setTextTypeForBaseline ] = useState('text')

  const handleAddSubmit = (e) =>{
      e.preventDefault()
     api.post('/InsertServlet', qr.stringify(values))
    .then(response=>console.log(response.data))
    .then(setOpenAdd(false))
    .then(()=>{
        displayMessage(addMessage)
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
    .catch(error=>console.log(error))
  }

 
  return (
      
    <>
    <GeneralDialogBox
        title = 'Add'
        open = {openAdd}
    >
        <form onSubmit={handleAddSubmit}>
            <Grid container spacing ={1}>
                <Grid item md ={3} >
                    <GeneralTextField 
                        label='Business Code' 
                        name='businessCode'
                        required = {true}
                        inputProps={{ maxLength: 10 }}
                        onChange = {handleInputChange}
                    />
                </Grid>
                <Grid item md ={3}>
                    <GeneralTextField 
                        type="number"
                        label= 'Customer Number'
                        name= 'custNumber'
                        required = {true}
                        onChange = {handleInputChange} 
                    />
                </Grid>
                <Grid item md ={3}>
                    <GeneralTextField 
                        type={textTypeForClearDate}
                        label='Clear Date' 
                        name= 'clearDate'
                        onFocus={() =>setTextTypeForClearDate('date')}
                        onBlur={() =>setTextTypeForClearDate('text') }
                        onChange = {handleInputChange} 
                    />
                </Grid>
                <Grid item md ={3}>
                    <GeneralTextField 
                        type="number" 
                        label='Buisness Year' 
                        name= 'buisnessYear'
                        onChange = {handleInputChange} 
                    />
                </Grid>
            </Grid>
            <Grid container spacing ={1}>
                <Grid item md ={3} >
                    <GeneralTextField 
                        label='Document Id' 
                        name= 'docId'
                        inputProps={{ maxLength: 10 }}
                        onChange = {handleInputChange} 
                    />
                </Grid>
                <Grid item md ={3}>
                    <GeneralTextField 
                        type={textTypeForPostingDate} 
                        label='Posting Date'
                        name= 'postingDate'
                        onFocus={() =>setTextTypeForPostingDate('date')}
                        onBlur={() =>setTextTypeForPostingDate('text') }
                        onChange = {handleInputChange}  
                    />
                </Grid>
                <Grid item md ={3}>
                    <GeneralTextField 
                        type={textTypeForDocument}
                        label='Document Create Date' 
                        name= 'documentCreateDate'
                        onFocus={() =>setTextTypeForDocument('date')}
                        onBlur={() =>setTextTypeForDocument('text') }
                        onChange = {handleInputChange} 
                    />
                </Grid>
                <Grid item md ={3}>
                    <GeneralTextField 
                        type={textTypeForDueDate}
                        label='Due Date' 
                        name= 'dueInDate'
                        onFocus={() =>setTextTypeForDueDate('date')}
                        onBlur={() =>setTextTypeForDueDate('text') }
                        onChange = {handleInputChange} 
                    />
                </Grid>
            </Grid>
            <Grid container spacing ={1}>
                <Grid item md ={3} >
                    <GeneralTextField 
                        label='Invoice Currency' 
                        name= 'invoiceCurrency'
                        inputProps={{ maxLength: 5 }}
                        onChange = {handleInputChange} 
                    />
                </Grid>
                <Grid item md ={3}>
                    <GeneralTextField 
                        label='Document Type' 
                        name= 'documentType'
                        inputProps={{ maxLength: 5 }}
                        onChange = {handleInputChange} 
                    />
                </Grid>
                <Grid item md ={3}>
                    <GeneralTextField 
                        type="number"
                        label='Posting Id'
                        name= 'postingId'
                        onChange = {handleInputChange} 
                    />
                </Grid>
                <Grid item md ={3}>
                    <GeneralTextField 
                        type="number" 
                        label='Total Open Amount' 
                        name= 'totalOpenAmount'
                        onChange = {handleInputChange} 
                    />
                </Grid>
            </Grid>
            <Grid container spacing ={1}>
                <Grid item md ={3} >
                    <GeneralTextField 
                        type={textTypeForBaseline} 
                        label='Baseline Create Date' 
                        name= 'baselineCreateDate'
                        onFocus={() =>setTextTypeForBaseline('date')}
                        onBlur={() =>setTextTypeForBaseline('text') }
                        onChange = {handleInputChange} 
                    />
                </Grid>
                <Grid item md ={3}>
                    <GeneralTextField 
                        label='Customer Payment Terms' 
                        name= 'custPaymentTerms'
                        inputProps={{ maxLength: 5 }}
                        onChange = {handleInputChange} 
                    />
                </Grid>
                <Grid item md ={3}>
                    <GeneralTextField 
                        type="number"
                        label='Invoice Id' 
                        name= 'invoiceId'
                        onChange = {handleInputChange} 
                    />
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12} sm={12} md={6}>
                    <Button 
                        variant ="outlined" 
                        type='submit'
                        className = {classes.addCloseBtn}>
                            ADD
                    </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Button variant = "outlined" onClick = {() =>setOpenAdd(false)} className = {classes.addCloseBtn}>CLOSE</Button>
                </Grid>
            </Grid>
            </form>
    </GeneralDialogBox>
    </>
  )
}

export default Add