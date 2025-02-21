import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useUserActions from '@/hooks/useUserAction';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();

  const { login, loginSuccess } = useUserActions();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage(''); // Reset error message

    if (!id || !password) {
      setErrorMessage('Id and password are required.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await login({ gw_id: id, gw_pass: password, auto_save_id: 0 });
      if (res?.success) {
        const result = await loginSuccess(res);
        if (result) {
          navigate('/', { replace: true });
        } else {
        }
      }
    } catch (err) {
      setErrorMessage((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100'>
      <Card className='w-full max-w-md shadow-lg'>
        <CardHeader>
          <CardTitle className='text-center text-xl font-bold'>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <Label htmlFor='email'>User</Label>
              <Input id='email' value={id} onChange={(e) => setId(e.target.value)} placeholder='Enter user id' />
            </div>
            <div>
              <Label htmlFor='password'>Password</Label>
              <Input id='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password' />
            </div>
            {errorMessage && <p className='text-sm text-red-500 text-center'>{errorMessage}</p>}
            <Button type='submit' className='w-full text-caps_blue' disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
