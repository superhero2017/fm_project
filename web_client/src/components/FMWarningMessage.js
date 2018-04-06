import React from 'react'
import {
  Message as UIMessage,
} from 'semantic-ui-react'

const FMWarningMessage = ({ children, ...rest, }) => {
  console.log(rest);
  // Can add error prop to make it display red
  return (
    <UIMessage warning  style={{"textAlign": "left"}}>
      {children}
    </UIMessage>
  )
}

// // Wrapper for UIMessage.Content to swallow the unnecessary props passed
// const FMMessageContent = ({ children, ...rest, }) => {
//   return (
//     <UIMessage.Content>
//       {children}
//     </UIMessage.Content>
//   )
// }

export default FMWarningMessage
