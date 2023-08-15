import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useUpdateEffect } from 'usehooks-ts';

import TextField from '../TextField';
import { password, email } from './validations';

interface AuthInputs {
  email: string;
  password: string;
  confirmpassword: string;
}

interface AuthFormProps {
  onSubmit: SubmitHandler<AuthInputs>;
}

const RESET_OPTIONS = {
  keepDefaultValues: false,
  keepDirty: false,
  keepDirtyValues: false,
  keepErrors: false,
  keepIsSubmitted: false,
  keepIsValid: false,
  keepSubmitCount: false,
  keepTouched: false,
  keepValues: false,
};

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit }) => {
  const [isRegistration, setIsRegistration] = React.useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    watch,
  } = useForm<AuthInputs>({
    mode: 'onBlur',
  });
  const pass = watch('password');

  // Doesn't run the first time
  // NOTE: https://usehooks-ts.com/react-hook/use-is-first-render
  useUpdateEffect(() => {
    reset({ email: '', password: '', confirmpassword: '' }, RESET_OPTIONS);
  }, [isRegistration]);

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h3" color="white" sx={{ mb: 2 }}>
        {isRegistration ? 'Sign up' : 'Log in'}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <TextField
            label="Email"
            {...register('email', email)}
            error={!!errors.email}
            helperText={errors.email?.message}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Password"
            type="password"
            {...register('password', password)}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {isRegistration && (
            <>
              <TextField
                label="Confirm password"
                type="password"
                {...register('confirmpassword', {
                  required: password.required,
                  validate: (value) => {
                    if (value && pass && value !== pass) {
                      return 'Must be same as the password entered above';
                    }
                  },
                })}
                error={!!errors.confirmpassword}
                helperText={errors.confirmpassword?.message}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </>
          )}
          <Box
            sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}
          >
            <Button
              type="submit"
              variant="contained"
              disabled={!isDirty || !isValid}
            >
              {isRegistration ? 'Sign up' : 'Log in'}
            </Button>
            <Button
              type="button"
              variant="text"
              onClick={() =>
                setIsRegistration((isRegistration) => !isRegistration)
              }
            >
              {isRegistration ? 'Log in' : 'Sign up'}
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
};

export default AuthForm;
