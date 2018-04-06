/* eslint-disable no-unused-vars */
import {
  isValidNumber as libIsValidPhoneNumber
} from 'libphonenumber-js'

const isRequired = (val) => {
  console.log(val)
  return val && val.length > 0
}
const isNumber = (val) => !isNaN(val)

const isPositiveNumber = (val) => isNumber(val) && Number(val) > 0

const requiredError = (props) => {
  //console.log("REQUIRED ERROR")
  //console.log(props)
  const { touched, valid, focus } = props.fieldValue
  return !focus && touched && !valid
}
const modelError = (model) => {
  if (!model) return false
  console.log("MODELERROR");
  console.log(model);
  const { touched, valid, focus } = model
  return !focus && touched && !valid
}

const dropdownError = (model) => {
  if (!model) return false
  console.log("dropdownERROR");
  console.log(model);
  const { touched, valid, focus, pristine } = model
  return !focus && !pristine && !valid

}

const isEmail = (val) => {
    if (!(val && val.length > 0)) {
      return false
    }
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    // Old version with escapes
    // var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(val)
}

const isPhoneNumber = (val) => {
  return libIsValidPhoneNumber(val)
}

export {
  isRequired, isNumber, isPositiveNumber,
  isEmail, isPhoneNumber,
  requiredError, modelError, dropdownError,
}
