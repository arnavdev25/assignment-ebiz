import React from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const { login } = React.useContext(AuthContext);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const success = await login(data.email, data.password);

        if (success) {
            alert('Login Successful!');
            navigate('/');
        } else {
            alert('Login Failed');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input placeholder="Email" {...register('email', { required: true })} />
                <p>{errors.email && 'Email is required'}</p>

                <input type="password" placeholder="Password" {...register('password', { required: true })} />
                <p>{errors.password && 'Password is required'}</p>

                <button type="submit">Login</button>
            </form>
            <Link to="/forgot-password">Forgot Password?</Link>
        </div>
    );
};

export default Login;
