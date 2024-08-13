import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      await axios.post('http://localhost:8080/user/change/password', {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      alert('Password changed successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to change password.');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="password" placeholder="Old Password" {...register('oldPassword', { required: true })} />
        <p>{errors.oldPassword && 'Old Password is required'}</p>

        <input type="password" placeholder="New Password" {...register('newPassword', { required: true, minLength: 6 })} />
        <p>{errors.newPassword && 'New Password is required (min 6 chars)'}</p>

        <input type="password" placeholder="Confirm New Password" {...register('confirmPassword', { required: true })} />
        <p>{errors.confirmPassword && 'Please confirm your new password'}</p>

        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
