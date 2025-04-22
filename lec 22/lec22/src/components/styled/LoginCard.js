import styled from 'styled-components';

// A container that mirrors your existing `.card`
export const Card = styled.div`
  width: 360px;
  margin: 60px auto;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 8px;
  background: #fff;
`;

// Headings, paragraphs, form‑groups, etc.
export const Title = styled.h3`
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  color: #333;
`;

export const Subtitle = styled.p`
  margin-bottom: 1.5rem;
  color: #666;
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.25rem;
    font-weight: 500;
  }

  input, select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
`;
