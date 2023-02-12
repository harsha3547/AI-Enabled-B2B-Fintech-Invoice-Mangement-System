import React from 'react'
import {TextField, makeStyles} from '@material-ui/core';

const useStyles = makeStyles({
    inputArea:{
        width: "200px",
        height: "50px",
        borderRadius: "5px",
        padding: "8px",
        outline: "none",
        margin: "15px 10px",
        backgroundColor:'#fff'
        
    }
})
function GeneralTextField(props) {
    const classes = useStyles()
    const {required, name, label, onChange, inputProps,type, onFocus, onBlur} = props
  return (
    <>
    <TextField 
        type = {type}
        name={name}
        label={label}
        autoComplete='off'
        required={required}
        onChange = {onChange}
        inputProps={inputProps}
        onFocus = {onFocus}
        onBlur = {onBlur}
        className = {classes.inputArea}
    />

    </>
  )
}

export default GeneralTextField