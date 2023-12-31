import { useEffect, useState } from 'react';
import { Button, CardContent, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { phoneNumberValidation } from '../utils/validations';
import styled from '@emotion/styled';

interface FieldValuesInterface {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
}

const defaultFieldValues: FieldValuesInterface = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  address: '',
}

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledTextField = styled(TextField)`
  margin-bottom: 1rem;
`

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState(() => {
    const storedUserInfo = localStorage.getItem('userInfo')

    if (storedUserInfo !== null) return JSON.parse(storedUserInfo)

    return defaultFieldValues
  })

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    const { name, value } = e.target

    setUserInfo((prevFormData: FieldValuesInterface) => ({
      ...prevFormData,
      [name]: value
    }))
  }

  useEffect(() => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
  }, [userInfo]);

  const handleNext = () => {
    if (
      !userInfo.firstName ||
      !userInfo.lastName ||
      !userInfo.phoneNumber ||
      !userInfo.address
    ) {
      alert('Please fill in all fields before proceeding.');
    } else if (!userInfo.phoneNumber.match(phoneNumberValidation)) {
      alert(`
        Please use one of the following phone number formats:
        (123) 456-7890
        (123)456-7890
        123-456-7890
        1234567890
      `)
    }else {
      navigate('/pokemon');
    }
  }
  return (
    <StyledCardContent>
      <StyledTextField
        required
        label="First Name"
        id="firstName"
        inputProps={{"data-testid": "firstName"}}
        name="firstName"
        onChange={handleChange}
        value={userInfo?.firstName}
      />
      <StyledTextField
        required
        label="Last Name"
        id="lastName"
        inputProps={{"data-testid": "lastName"}}
        name="lastName"
        onChange={handleChange}
        value={userInfo?.lastName}
      />
      <StyledTextField
        required
        label="Phone Number"
        id="phoneNumber"
        inputProps={{"data-testid": "phoneNumber"}}
        name="phoneNumber"
        onChange={handleChange}
        value={userInfo?.phoneNumber}
      />
      <StyledTextField
        required multiline rows={4}
        label="Address"
        id="address"
        inputProps={{"data-testid": "address"}}
        name="address"
        onChange={handleChange}
        value={userInfo?.address}
      />

      <Button onClick={handleNext} data-testid="nextButton">Next</Button>
    </StyledCardContent>
  )
}

export default UserInfo
