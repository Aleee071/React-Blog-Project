import React, { useState } from "react";
import accountManager from "../appwrite/accountHandling";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { Button, Input } from "./index";
import { Link, useNavigate } from "react-router-dom";

function Login() {
	const { register, handleSubmit } = useForm();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [error, setError] = useState("");

	const submit = async (data) => {
		setError("");
		try {
			const session = await accountManager.login(data);
			if (session) {
				const userData = await accountManager.getSession();
				if (userData) {
					dispatch(login({ userData }));
					navigate("/");
				}
			}
		} catch (error) {
			console.error("Login error:  ", error);
			setError(error.message);
		}
	};

	return (
		<div className='max-w-md mx-auto p-6 bg-white shadow-md rounded-lg'>
			<h1 className='text-2xl font-bold text-center mb-6 text-gray-800'>
				Sign in to your account
			</h1>
			<form onSubmit={handleSubmit(submit)} className='space-y-6'>
				<h2 className='text-lg font-semibold text-center text-gray-700'>
					Login
				</h2>
				<div className='space-y-5'>
					<div>
						<Input
							label='Email'
							type='email'
							placeholder='Enter your email'
							{...register("email", { required: true })}
						/>
					</div>
					<div>
						<Input
							label='Password'
							type='password'
							placeholder='Enter your password'
							{...register("password", { required: true })}
						/>
					</div>
				</div>
				{error && <p className='text-sm text-red-600'>{error}</p>}
				<Button
					type='submit'
					className='w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2'
				>
					Login
				</Button>
			</form>
			<p className='text-center text-gray-600 mt-6'>
				Don't have an account?{" "}
				<Link to='/signup' className='text-blue-600 hover:underline'>
					Signup
				</Link>
			</p>
		</div>
	);
}

export default Login;
