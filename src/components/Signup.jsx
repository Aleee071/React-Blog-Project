import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Toast } from "./index";
import { useDispatch } from "react-redux";
import accountManager from "../appwrite/accountHandling";
import { useForm } from "react-hook-form";

function Signup() {
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

	const signup = async (data) => {
		setError("");
		setLoading(true);
		try {
			const session = await accountManager.createAccount(data);
			if (session) {
				const userData = await accountManager.getSession();
				if (userData) dispatch(login(userData));
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
				message='Account created successfully! Redirecting...'
				show={showToast}
				onClose={() => setShowToast(false)}
			/>
			<div className='relative w-full max-w-md'>
				{/* Background decorative elements */}
				<div className='absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl'>
					<div
						className='aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-blue-500 to-blue-700 opacity-20'
						style={{
							clipPath:
								"polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
						}}
					></div>
				</div>

				{/* Signup Form */}
				<div className='relative bg-slate-900/50 backdrop-blur-xl px-6 py-12 shadow-2xl ring-1 ring-white/10 rounded-2xl'>
					<h2 className='text-center text-3xl font-bold tracking-tight text-white mb-8'>
						Create Account
						<span className='block text-sm font-normal text-slate-400 mt-1'>
							Join our community today
						</span>
					</h2>

					{error && (
						<div className='bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg p-4 mb-6 backdrop-blur-sm'>
							{error}
						</div>
					)}

					<form onSubmit={handleSubmit(signup)} className='space-y-6'>
						<Input
							label='Full Name'
							placeholder='Enter your full name'
							{...register("name", {
								required: "Name is required",
								minLength: {
									value: 2,
									message: "Name must be at least 2 characters",
								},
							})}
							error={errors.name?.message}
						/>
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
						<Input
							label='Password'
							type='password'
							placeholder='Enter your password'
							{...register("password", {
								required: true,
							})}
							error={errors.password?.message}
						/>

						<Button
							type='submit'
							className='w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
							disabled={loading}
						>
							{loading ? (
								<div className='flex items-center justify-center gap-2'>
									<div className='w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin'></div>
									Creating account...
								</div>
							) : (
								"Create Account"
							)}
						</Button>

						<p className='text-center text-sm text-slate-400'>
							Already have an account?{" "}
							<Link
								to='/login'
								className='font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200'
							>
								Sign in
							</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Signup;
