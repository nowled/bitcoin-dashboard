import React from 'react';
import styled from 'styled-components';

const ToolTipText = styled('span')({
  visibility: 'hidden',
  width: '120px',
  backgroundColor: '#02231c',
  color: 'red',
  textAlign: 'center',
  borderRadius: '6px',
  padding: '5px 0',
  position: 'absolute',
  zIndex: 1,
  bottom: '150%',
  left: '50%',
  marginLeft: '-90px',
  ':after': {
    content: '""',
    position: 'absolute',
    top: '100%',
    left: '50%',
    marginLeft: '-5px',
    borderWidth: '5px',
    borderStyle: 'solid',
    // borderColor: 'green transparent transparent transparent',
  },
});

const ToolTip = styled('div')({
  position: 'relative',
  display: 'inline-block',
  borderBottom: '1px dotted green',
  ':hover span': {
    visibility: 'visible',
  },
});

const ToolTips = ({ children, toolTipText }) => (
  <ToolTip>
    {children}
    <ToolTipText>{toolTipText}</ToolTipText>
  </ToolTip>
);

export default ToolTips;
