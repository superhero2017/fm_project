
const UIInput = (props) => {
  const { error, label, ...inputProps } = props;
  console.log("UIINPUT Rendered")
  console.log(inputProps)
  return (
    <div>
      <label>{error ? "Error" : label}</label>
      <input type="text" {...inputProps}></input>
    </div>
  )
}

export { UIInput }
