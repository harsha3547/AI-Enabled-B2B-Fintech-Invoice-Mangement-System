import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import './UiStyling.css';
import logo from '../Images/abc_products.png';
import logo2 from '../Images/logo.svg';
import { Grid , Button } from '@material-ui/core';
import { ButtonGroup } from '@material-ui/core';
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';
import { makeStyles } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import Add from './Add';
import Edit from './Edit';
import Delete from './Delete';
import AdvanceSearch from './AdvanceSearch';
import SerachField from './SearchField';
import AnalyticsView from './AnalyticsView';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@mui/material';
import api from './AxiosInstance'

const useStyles = makeStyles({
    btnGroup:{
        borderColor: "#1B95CE",  
        color: "#b8d2d9",
        borderRadius: "10px",
        padding: "5px 36px",
        "&:hover":{
            backgroundColor:"#14AFF1"
        }
 
    },
    refresh:{
        borderColor: "#1B95CE", 
        color: "#b8d2d9",
        borderRadius: "5px",
        marginLeft: "3px",
        "&:hover":{
            backgroundColor:"#14AFF1"
        }
    },
    AddEditDeleteBtn:{
        borderColor: "#1B95CE", 
        color: "#b8d2d9",
        borderRadius: "5px",
        padding: "5px 70px",
        "&:hover":{
            backgroundColor:"#14AFF1"
        }
    }
})


function ProjectUI() {

    const classes = useStyles()
    const [ data , setData ] = useState([])
    const [ openAdd , setOpenAdd ] = useState(false)
    const [ openEdit , setOpenEdit ] = useState(false)
    const [ openDelete , setOpenDelete ] = useState(false)
    const [ openAdvanceSearch , setOpenAdvanceSearch ] = useState(false)
    const [ openAnalytics, setOpenAnalytics ] = useState(false)
    const [ refresh , setRefresh ] = useState(false)
    const [ alert, setAlert ] = useState(false) 
    const [ message, setMessage] = useState('') 
    const [pageSize, setPageSize] = useState(10)
    const [ checkBoxSelection, setCheckBoxSelection ] =useState(false)
    const [ limit , setLimit] = useState(1000)
    const [ DataGridRow, setDataGridRow] = useState([])
    const [ values, setValues] = useState({
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
     })


     const [analyticsValues, setAnalyticsValues ] = useState({
         startClearDate : '',
         endClearDate : '',
         startDueDate : '',
         endDueDate : '',
         startBaselineCreateDate : '',
         endBaselineCreateDate : '',
         invoiceCurrency : ''
     })     

     const handleAlertOpen = () =>{
         setAlert(true)
     }

     const handleAlertClose = ()=>{
         setAlert(false)
     }

     const displayMessage= (message) =>{
         setMessage(message)
     }

    useEffect(() =>{
        api.get(`/ServletFetch?limit=${limit}`)
        .then(Response => setData(Response.data))
        .catch(error =>{
            console.log(error)  
        })  
    },[refresh,limit])


    const handleInputChange = e =>{
        const { name, value } = e.target
        setValues({
            ...values,
            [name]:value
        })
    }

    const cols =[
        {field:'slNo' , headerName:'s.No' ,width:100},
        {field:'businessCode' , headerName:'Business Code' ,width:120},
        {field:'custNumber' , headerName:'Customer Number' ,width:150},
        {field:'clearDate', headerName:'Clear Date' ,width:150},
        {field:'businessYear' , headerName:'Business Year' ,width:150},
        {field:'docId' , headerName:'Document Id' ,width:150},
        {field:'postingDate', headerName:'Posting Date' ,width:150},
        {field:'documentCreateDate', headerName:'Document Create Date' ,width:200},
        {field:'dueInDate' , headerName:'Due Date' ,width:150},
        {field:'invoiceCurrency' , headerName:'Invoice Currency' ,width:150},
        {field:'documentType', headerName:'Document Type' ,width:150},
        {field:'postingId' , headerName:'Posting Id' ,width:130},
        {field:'totalOpenAmount' , headerName:'Total Open Amount' ,width:150},
        {field:'baselineCreateDate' , headerName:'Baseline Create Date' ,width:150},
        {field:'custPaymentTerms' , headerName:'Customer Payment Terms' ,width:180},
        {field:'invoiceId' , headerName:'Invoice Id' ,width:130},
        {field:'agingBucket' , headerName:'Aging Bucket' ,width:100}
    ]

    const rowData = data?.map(data =>{
        return {
            id : data?.slNo,
            slNo:data?.slNo,
            businessCode : data?.businessCode, 
            custNumber : data?.custNumber,
            clearDate : data?.clearDate,
            businessYear : data?.buisnessYear,
            docId : data?.docId,
            postingDate : data?.postingDate,
            documentCreateDate : data?.documentCreateDate,
            dueInDate : data?.dueInDate,
            invoiceCurrency : data?.invoiceCurrency,
            documentType : data?.documentType,
            postingId : data?.postingId,
            totalOpenAmount : data?.totalOpenAmount,
            baselineCreateDate : data?.baselineCreateDate,
            custPaymentTerms : data?.custPaymentTerms,
            invoiceId : data?.invoiceId,
            agingBucket : data.agingBucket?data.agingBucket:'(NULL)'
        }
    })
    
 


  return (
    <Fragment>
        <header className = "header-parent">
            <img className = "abc-products" src = {logo} alt = "Cannot load" />
            <img className = "highRadius" src = {logo2} alt = "Cannot load"/>
            <p id = "heading" >Invoice List</p>
        </header>
        <div className = "button-header">
            <Grid container >
                <Grid item xs={12} sm={12} md={5} >
                    <ButtonGroup variant="outlined" >
                        <Button className = {classes.btnGroup} disabled = {!checkBoxSelection}> PREDICT </Button>
                        <Button onClick = {() => setOpenAnalytics(true)}  className = {classes.btnGroup}> ANALYTICS VIEW </Button>
                        <Button onClick={() =>setOpenAdvanceSearch(true)} className = {classes.btnGroup}> ADVANCE SEARCH </Button>
                    </ButtonGroup>
                    <Button variant = "outlined" className = {classes.refresh} >
                        <RefreshOutlinedIcon color = "primary" onClick ={()=>{
                                setRefresh(!refresh) 
                                setLimit(1000)
                            }} />
                    </Button>
                </Grid>

                <Grid item xs={12} sm={4} md={2}>
                    <SerachField setData = {setData} />
                </Grid>
                <Grid item xs={12} sm={4} md={5} >
                    <Button 
                        variant="outlined" 
                        onClick ={() => setOpenAdd(true)} 
                        // disabled={checkBoxSelection}
                        className={classes.AddEditDeleteBtn}>ADD</Button> 
                    <Button 
                        variant="outlined"
                        onClick ={() => setOpenEdit(true)} 
                        disabled={!checkBoxSelection}
                        className={classes.AddEditDeleteBtn}>EDIT</Button> 
                    <Button 
                        variant="outlined"
                        onClick ={() => setOpenDelete(true)} 
                        disabled={!checkBoxSelection}
                        className={classes.AddEditDeleteBtn}>DELETE</Button> 
                </Grid>
            </Grid>
           
                <DataGrid 
                    rows={rowData}
                    columns={cols}
                    checkboxSelection
                    autoHeight
                    pageSize={pageSize}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    rowsPerPageOptions={[10,20,30]}
                    onRowClick = {(e)=>console.log(e.row)}
                   
                     onSelectionModelChange={(id)=>{
                        setDataGridRow(id);
                        id[0]? setCheckBoxSelection(true) :  setCheckBoxSelection(false)
                     }}
                    density='compact'
                    onPageChange={(page)=>{
                        if((limit/10)-1 === page){
                            console.log('changing the Limit')
                            setLimit(limit+1000)
                        }
                    }}
                    sx={{color:'#fff',
                         marginTop:'15px',
                        '& .MuiToolbar-root':{
                            color:'#fff'
                        },
                        '& .PrivateSwitchBase-input':{
                            borderColor:'#fff'
                        }}}

                /> 
           <AdvanceSearch 
                openAdvanceSearch = {openAdvanceSearch}
                handleInputChange={handleInputChange}
                values={values}
                setValues = {setValues}
                setOpenAdvanceSearch={setOpenAdvanceSearch}
                setData={setData}
                handleAlertOpen = {handleAlertOpen}
                displayMessage={displayMessage}
            />
            <Add 
                openAdd = {openAdd} 
                setOpenAdd = {setOpenAdd} 
                handleInputChange = {handleInputChange}
                values = {values}
                setValues = {setValues}
                handleAlertOpen = {handleAlertOpen}
                displayMessage = {displayMessage}
                />
            <Edit 
                openEdit = {openEdit}
                handleInputChange = {handleInputChange}
                values = {values}
                setOpenEdit = {setOpenEdit}
                DataGridRow = {DataGridRow}
                handleAlertOpen = {handleAlertOpen}
                displayMessage = {displayMessage}
                
            />
            <Delete 
                openDelete = {openDelete} 
                setOpenDelete = {setOpenDelete} 
                DataGridRow = {DataGridRow}
                handleAlertOpen = {handleAlertOpen}
                displayMessage = {displayMessage} />

            <AnalyticsView
                open = {openAnalytics}
                setOpenAnalytics = {setOpenAnalytics}
                analyticsValues = {analyticsValues}
                setAnalyticsValues = {setAnalyticsValues}
            />

           <Snackbar
                anchorOrigin = {{
                    vertical:'top',
                    horizontal:'center'
                }}
                open = {alert}
                autoHideDuration = {2000}
                onClose = {handleAlertClose}
           >
                <Alert severity = "success" >
                             {message} 
                </Alert>
            </Snackbar>

        </div>
        <footer id = "footer-id">
            
            <p> 
                <a href="https://www.highradius.com/privacy-policy/">Privacy Policy.</a>
                | &copy; 2022 HighRadius Corporation. All rights reserved.
            </p>
        </footer>
    </Fragment>
  )
}

export default ProjectUI