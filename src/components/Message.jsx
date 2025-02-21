import React from "react";
import { Message as StyledMessage } from "./StyledComponents";

const Message = ({ text, isUser }) => {
  return <StyledMessage isUser={isUser}>{text}</StyledMessage>;
};

export default Message;