import { Dialog,DialogContent, DialogTitle, makeStyles,Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({

    dialog:{
        backgroundColor: "#273d4a" 
    },
     heading:{
        color:"#fff",
        fontSize:'25px'
    },
    item:{
        backgroundColor:"#fff",
        margin:"0px 10px"
    }
})

function GeneralDialogBox(props) {
    const {title, open, fullScreen } = props
    const classes = useStyles()
  return (
    <>
    <Dialog open = {open} maxWidth = "md" fullScreen = {fullScreen}>
        <DialogTitle className={classes.dialog}>
            <Typography className={classes.heading}>
                {title}
            </Typography>
        </DialogTitle>
        <DialogContent className={classes.dialog}>
            {props.children}
        </DialogContent>
    </Dialog>
    </>
  )
}

export default GeneralDialogBox