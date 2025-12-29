import { createContext, useContext, useState } from 'react';

const FormErrorContext = createContext();

export const FormErrorProvider = ({ children }) => {
  const [hasErrors, setHasErrors] = useState(false);

  return (
    <FormErrorContext.Provider value={{ hasErrors, setHasErrors }}>
      {children}
    </FormErrorContext.Provider>
  );
};

export const useFormError = () => {
  const context = useContext(FormErrorContext);
  if (!context) {
    throw new Error('useFormError must be used within FormErrorProvider');
  }
  return context;
};

