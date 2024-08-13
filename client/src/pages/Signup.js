import React from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().email('Invalid Email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required(),
    gender: yup.string().oneOf(['male', 'female', 'other']).required('Gender is required'),
    dob: yup.date().required('Date of Birth is required'),
});

const Signup = () => {
    const { signup } = React.useContext(AuthContext);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = async (data) => {
        const success = await signup(data);

        if (success) {
            alert('Signup Successful! Please login.');
            navigate('/login');
        } else {
            alert('Signup Failed');
        }
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input placeholder="First Name" {...register('firstName')} />
                <p>{errors.firstName?.message}</p>

                <input placeholder="Last Name" {...register('lastName')} />
                <p>{errors.lastName?.message}</p>

                <input placeholder="Email" {...register('email')} />
                <p>{errors.email?.message}</p>

                <input type="password" placeholder="Password" {...register('password')} />
                <p>{errors.password?.message}</p>

                <select {...register('gender')}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                <p>{errors.gender?.message}</p>

                <input type="date" {...register('dob')} />
                <p>{errors.dob?.message}</p>

                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
