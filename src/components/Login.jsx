import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Toast, PasswordInput } from "./index";
import { useDispatch } from "react-redux";
import accountManager from "../appwrite/accountHandling";
import { useForm } from "react-hook-form";

function Login() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [showToast, setShowToast] = useState(false);

	const login = async (data) => {
		setError("");
		setLoading(true);
		try {
			const session = await accountManager.login(data);
			if (session) {
				const userData = await accountManager.getSession();
				if (userData) dispatch(authLogin({ userData }));
				setShowToast(true);
				setTimeout(() => {
					navigate("/");
				}, 2000);
			}
		} catch (error) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-4 py-10 sm:px-6 sm:py-16 lg:px-8'>
			<Toast
				message='Login successful! Redirecting...'
				show={showToast}
				onClose={() => setShowToast(false)}
			/>
			<div className='relative w-full max-w-md'>
				<div className='relative bg-slate-900/50 backdrop-blur-xl px-6 py-12 shadow-2xl ring-1 ring-white/10 rounded-2xl'>
					<h2 className='text-center text-3xl font-bold tracking-tight text-white mb-8'>
						Welcome Back
						<span className='block text-sm font-normal text-slate-400 mt-1'>
							Sign in to your account
						</span>
					</h2>

					{error && (
						<div className='bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg p-4 mb-6 backdrop-blur-sm'>
							{error}
						</div>
					)}

					<form onSubmit={handleSubmit(login)} className='space-y-6'>
						<Input
							label='Email'
							type='email'
							placeholder='Enter your email'
							{...register("email", {
								required: "Email is required",
								pattern: {
									value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
									message: "Please enter a valid email",
								},
							})}
							error={errors.email?.message}
						/>
						<PasswordInput
							label='Password'
							placeholder='Enter your password'
							{...register("password", {
								required: "Password is required",
								minLength: {
									value: 8,
									message: "Password must be at least 8 characters",
								},
							})}
							error={errors.password?.message}
						/>

						<Button
							type='submit'
							className='w-full bg-gradient-to-r from-blue-600 via-blue-900 to-blue-600/10 hover:from-blue-600 text-white py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
							disabled={loading}
						>
							{loading ? (
								<div className='flex items-center justify-center gap-2'>
									<div className='w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin'></div>
									Signing in...
								</div>
							) : (
								"Sign in"
							)}
						</Button>

						<p className='text-center text-sm text-slate-400'>
							Don't have an account?{" "}
							<Link
								to='/signup'
								className='font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200'
							>
								Sign up
							</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Login;
