import React, { useState } from 'react'
import { Dialog,DialogContent, makeStyles, Grid, Button } from '@material-ui/core'
import GeneralTextField from './GeneralComponents/GeneralTextField'
import GeneralDialogBox from './GeneralComponents/GeneralDialogBox'
import api from './AxiosInstance';
import qr from 'qs';
import {Bar} from 'react-chartjs-2';
//import { Chart as ChartJS } from 'chart.js/auto'

const useStyles = makeStyles({
    searchCancelBtn:{
        borderColor: "#fff", 
        color: "#fff",
        borderRadius: "2px",
        marginTop:"20px",
        width:"99%",
        "&:hover":{
            backgroundColor:"#14AFF1"
        }
    },
    analyticsCloseBtn:{
        borderColor: "#000", 
        color: "#000",
        borderRadius: "2px",
        marginTop:"20px",
        width:"99%",
        "&:hover":{
            backgroundColor:"#14AFF1",
        }
    }
})
function AnalyticsView(props) {
    const {open, setOpenAnalytics, analyticsValues, setAnalyticsValues } = props
    const [ textTypeForStartClearDate , setTextTypeForStartClearDate ] = useState('text')
    const [ textTypeForEndClearDate , setTextTypeForEndClearDate ] = useState('text')
    const [ textTypeForStartDueDate , setTextTypeForStartDueDate ] = useState('text')
    const [ textTypeForEndDueDate , setTextTypeForEndDueDate ] = useState('text')
    const [ textTypeForStartBaseline , setTextTypeForStartBaseline ] = useState('text')
    const [ textTypeForEndBaseline , setTextTypeForEndBaseline ] = useState('text')
    const [ openBarGraph, setOpenBarGraph ] = useState(false) 
    const [ response, setResponse ]  =useState([])

    const classes = useStyles()

    const businessNames = new Map([
        ["CA02","Unilever"],
        ["U001","Johnson and Johnson"],
        ["U002","Bose"],
        ["U005","Kellog's",],
        ["U007","Sony"],
        ["U013","Puma"]
    ])

    const handleSubmit = (e) =>{
        e.preventDefault()
        api.post(`/AnalyticsViewServlet`,qr.stringify(analyticsValues))
        .then(response=>{
            setResponse(response.data)
        })
        .then(setOpenAnalytics(false))
        .then(()=>setOpenBarGraph(true)) 
        .then(setAnalyticsValues({
            startClearDate : '',
            endClearDate : '',
            startDueDate : '',
            endDueDate : '',
            startBaselineCreateDate : '',
            endBaselineCreateDate : '',
            invoiceCurrency : ''
        }))
    }

    const handleInputChange = e =>{
        const { name, value } = e.target
        setAnalyticsValues({
            ...analyticsValues,
            [name]:value
        })
    }
  return (
    <>
        <GeneralDialogBox
            
            open = {open}
            title = 'Analytics View'
            >
                <form onSubmit={handleSubmit}>
                    <Grid container >
                        <Grid item md={6} >
                            <p style={{color:'#fff'}}>Clear Date</p>
                            <GeneralTextField
                                type={textTypeForStartClearDate}
                                name= 'startClearDate'
                                label='From'
                                onFocus={() =>setTextTypeForStartClearDate('date')}
                                onBlur={() =>setTextTypeForStartClearDate('text') }
                                onChange = {handleInputChange} 
                            />
                        </Grid>
                        <Grid item md={6}>  
                            <p style={{color:'#fff'}}>Due Date</p>
                            <GeneralTextField
                                type={textTypeForStartDueDate}
                                name= 'startDueDate'
                                label='From'
                                onFocus={() =>setTextTypeForStartDueDate('date')}
                                onBlur={() =>setTextTypeForStartDueDate('text') }
                                onChange = {handleInputChange} 
                            />
                        </Grid>
                    </Grid>

                    <Grid container >
                        <Grid item md={6} >
                            <GeneralTextField
                                type={textTypeForEndClearDate}
                                label='To'
                                name= 'endClearDate'
                                onFocus={() =>setTextTypeForEndClearDate('date')}
                                onBlur={() =>setTextTypeForEndClearDate('text') }
                                onChange = {handleInputChange} 
                            />
                        </Grid>
                        <Grid item md={6}>  
                            <GeneralTextField
                                type={textTypeForEndDueDate}
                                name= 'endDueDate'
                                label='To'
                                onFocus={() =>setTextTypeForEndDueDate('date')}
                                onBlur={() =>setTextTypeForEndDueDate('text') }
                                onChange = {handleInputChange} 
                            />
                        </Grid>
                    </Grid>

                    <Grid container >
                        <Grid item md={6} >
                            <p style={{color:'#fff'}}>Baseline Create Date</p>
                            <GeneralTextField
                                type={textTypeForStartBaseline}
                                name= 'startBaselineCreateDate'
                                label='From'
                                onFocus={() =>setTextTypeForStartBaseline('date')}
                                onBlur={() =>setTextTypeForStartBaseline('text') }
                                onChange = {handleInputChange} 
                            />
                        </Grid>
                        <Grid item md={6}>  
                            <p style={{color:'#fff'}}>Invoice Currency</p>
                            <GeneralTextField
                                name= 'invoiceCurrency'
                                label = 'Invoice Currency'
                                onChange = {handleInputChange} 
                            />
                        </Grid>
                    </Grid>

                    <Grid container >
                        <Grid item md={6} >
                            <GeneralTextField
                                type = {textTypeForEndBaseline}
                                name = 'endBaselineCreateDate'
                                label = 'To'
                                onFocus = {() =>setTextTypeForEndBaseline('date')}
                                onBlur = {() =>setTextTypeForEndBaseline('text') }
                                onChange = {handleInputChange} 
                            />
                        </Grid>
                    </Grid>
                    

                    <Grid container>
                        <Grid item md={6}>
                            <Button type='submit' variant= 'outlined' className= {classes.searchCancelBtn}  >Submit</Button>
                        </Grid>
                        <Grid item md={6}>
                            <Button onClick = {() =>setOpenAnalytics(false)} variant= 'outlined' className= {classes.searchCancelBtn}>Cancel</Button>
                        </Grid>
                    </Grid>
                </form>
            
        </GeneralDialogBox>
        <Dialog
            open = {openBarGraph}
            fullScreen
        >
        <DialogContent>
           <Bar data={{
                    labels: response.map(x => businessNames.get(x.businessCode)),
                    datasets: [{
                        label: 'Sum of Total Amount',
                        data: response.map(x => x.sumOfTotalAmount),
                        backgroundColor: [
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 99, 132, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    },
                    {
                        label: 'No. Of Customers',
                        data: response.map(x => x.countOfCustomers),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }

                ],
                }}
             />

            <Button onClick={()=>setOpenBarGraph(false)} variant="outlined" fullWidth className={classes.analyticsCloseBtn}>Close</Button>

        </DialogContent>
    </Dialog>
</>
  )
}

export default AnalyticsView