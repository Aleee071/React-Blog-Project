import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input } from "./index";
import accountManager from "../appwrite/accountHandling";

function Signup() {
	const [error, setError] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { register, handleSubmit } = useForm();

	const submit = async (data) => {
		setError("");
		try {
			const session = await accountManager.createAccount(data);
			console.log("Session created: ", session);

			if (session) {
				console.log("fetching Session..... ");
				const userData = await accountManager.getSession(); //! some problem here
				console.log("Get Session: ", userData);

				if (userData) {
					dispatch(login(userData));
					navigate("/");
				}
			}
		} catch (error) {
			console.error("Signup error:  ", error);
			setError(error.message);
		}
	};
	return (
		<div className='max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg'>
			<h1 className='text-2xl font-bold text-gray-800 text-center mb-6'>
				Sign up to create an account
			</h1>
			<form onSubmit={handleSubmit(submit)} className='space-y-6'>
				<div>
					<Input
						label='name'
						type='text'
						placeholder='Enter your full name'
						{...register("name", { required: true })}
					/>
				</div>
				<div>
					<Input
						label='Email'
						type='email'
						placeholder='Enter your email'
						{...register("email", {
							required: true,
						})}
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
				{error && <p className='text-sm text-red-600'>{error}</p>}
				<Button
					type='submit'
					className='w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-300'
				>
					Sign Up
				</Button>
			</form>
			<p className='text-center text-gray-600 mt-6'>
				Already have an account?{" "}
				<Link to='/login' className='text-blue-600 hover:underline'>
					Login here
				</Link>
			</p>
		</div>
	);
}

export default Signup;
