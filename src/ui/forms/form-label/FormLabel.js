import React from 'react';
import styled from 'styled-components';

const LabelUI = styled.label`
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
  font-weight: bold;
  text-align: ${({ arabic }) => arabic ? 'right' : 'left'};
`;

const FormLabel = props => <LabelUI {...props} />;

FormLabel.displayName = 'FormLabel';

export default FormLabel;
