"use client";
import React, { useState } from 'react';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        setMessage('');

        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include'  // Ensures cookies are sent with the request
            });

            if (!response.ok) {
                // If the response is not ok, don't try to parse it as JSON
                throw new Error('Login failed: Server returned an error');
            }

            const data = await response.json();

            if (data.success) {
                setMessage('Login successful!');
                window.location.href = '/users';
            }
            else {
                setMessage(data.message || 'Login failed: Unknown error');
                console.log(data.message);
            }
        } catch (error) {
            if (error instanceof SyntaxError) {
                setMessage('Invalid server response. Not JSON.');
            } else {
                setMessage((error as Error).message || 'Login failed: Server error or network issue');
            }
        }
    };


    return (
        <div className="bg-white border rounded-xl w-4/12 mx-auto mt-44 shadow-sm">
            <div className="p-4 sm:p-7">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800">Sign in</h1>
                </div>
                <div className="mt-5">
                    <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:mr-6 after:flex-1 after:border-t after:ml-6">
                        Welcome to SARTEX Administration
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm mb-2">Email address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="py-3 px-4 block w-full outline-1 border-gray-500 border outline-gray-800 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    aria-describedby="email-error"
                                />
                            </div>
                            <div>
                                <div className="flex justify-between items-center">
                                    <label htmlFor="password" className="block text-sm mb-2">Password</label>
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="py-3 px-4 block w-full border border-gray-500 outline-1 outline-gray-800 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    aria-describedby="password-error"
                                />
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="shrink-0 mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                                />
                                <label htmlFor="remember-me" className="ml-3 text-sm">Remember me</label>
                            </div>
                            <button type="submit" className="w-full bg-blue-100 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                                Sign in
                            </button>
                            {message && <div className="text-center mt-4 text-sm font-semibold text-red-500">{message}</div>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
