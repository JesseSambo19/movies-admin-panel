import React, { useState } from 'react';

import Card from '../../../components/UI/Card/Card';
import classes from './SendOTPEmail.module.css';
import Button from '../../../components/UI/Button/Button';
import { useAuth } from '../../../store/auth-context';

import Center from '../../../components/UI/Center/Center';

const SendVerificationEmail = () => {
  const authCtx = useAuth();
  const [otp, setOtp] = useState(['', '', '', '', '', '']); // Stores the OTP digits
  const [sendOtp, setSendOtp] = useState(false); // keeps track of whether user already sent an otp request
  const [sendingOtp, setSendingOtp] = useState(false); // keeps track of sending state
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  // Handles changes to OTP input
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      // Only allow digits
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input field if a digit is entered
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim();

    if (/^\d{6}$/.test(pasteData)) {
      setOtp(pasteData.split(''));
    }
  };

  const handleSendOtp = () => {
    authCtx.onSendOtp(setSendingOtp, setSendOtp);
  };

  const verifyOtp = (otpCode) => {
    authCtx.onVerifyOtp(otpCode, setVerifyingOtp);
  };

  // Handles OTP submission
  const handleVerifyOtp = () => {
    const otpCode = otp.join('');
    verifyOtp(otpCode);

    // if (otpCode.length === 6) {
    //   verifyOtp(otpCode);
    // } else {
    //   alert('Please enter a valid 6-digit OTP.');
    // }
  };

  return (
    <Center>
      <Card className={classes['send-otp-email']}>
        {sendOtp && !sendingOtp ? (
          <p>
            Enter the 6-digit OTP sent to your email to verify your account and
            access the dashboard.
          </p>
        ) : (
          <p>
            To continue using the dashboard, please verify your email. Press
            "Send OTP" to receive a 6-digit verification code.
          </p>
        )}

        <div className={classes.otpContainer}>
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onPaste={handlePaste} // will be paste all otp code on the input field
              className={classes.otpInput}
            />
          ))}
        </div>

        <div className={classes.actions}>
          <Button
            // if verifying otp code or input doesn't have 6 digits then the verify otp button will be disabled
            disabled={verifyingOtp || otp.join('').length < 6}
            onClick={handleVerifyOtp}
          >
            {verifyingOtp ? 'Verifying...' : 'Verify OTP'}
          </Button>
        </div>

        <div className={classes.actions}>
          <Button
            disabled={sendingOtp}
            style={{
              background: 'none',
              border: 'none',
              color: 'blue',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
            onClick={handleSendOtp}
          >
            {sendingOtp ? 'Sending...' : sendOtp ? 'Resend OTP' : 'Send OTP'}
          </Button>
        </div>

        <div className={classes.actions}>
          <Button
            style={{
              background: 'none',
              border: 'none',
              color: 'blue',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
            onClick={authCtx.onLogout}
          >
            Log Out
          </Button>
        </div>
      </Card>
    </Center>
  );
};

export default SendVerificationEmail;
