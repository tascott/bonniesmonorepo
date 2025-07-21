'use client';

import { useEffect } from 'react';
import Head from 'next/head';

export default function ResetPasswordPage() {
  useEffect(() => {
    // Get the hash fragment and construct mobile deep link
    function getMobileDeepLink() {
      const hash = window.location.hash;
      // e.g., com.bonnie.mobile://reset-password#access_token=...&refresh_token=...
      return 'com.bonnie.mobile://reset-password' + hash;
    }

    const button = document.getElementById('open-app-button') as HTMLAnchorElement | null;
    const codeElement = document.getElementById('fallback-link');
    const countdownElement = document.getElementById('countdown');

    if (button && codeElement && countdownElement) {
      const deepLink = getMobileDeepLink();

      // Update the button and fallback link
      button.href = deepLink;
      codeElement.textContent = deepLink;

      // Countdown and auto-redirect
      let seconds = 5;
      const countdown = setInterval(() => {
        seconds--;
        if (seconds > 0) {
          countdownElement.textContent = `You'll be redirected automatically in ${seconds} seconds.`;
        } else {
          countdownElement.textContent = 'Redirecting now...';
          clearInterval(countdown);
          window.location.href = deepLink;
        }
      }, 1000);

      return () => clearInterval(countdown); // Cleanup on component unmount
    }
  }, []);

  return (
    <>
      <Head>
        <title>Reset Password - Bonnie's</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>{`
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background-color: #f3f4f6;
            padding: 20px;
          }
          .container {
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            width: 100%;
            text-align: center;
          }
          .logo {
            width: 200px;
            height: auto;
            margin-bottom: 30px;
          }
          h1 {
            color: #1f2937;
            font-size: 24px;
            margin-bottom: 16px;
          }
          p {
            color: #6b7280;
            margin-bottom: 24px;
            line-height: 1.5;
          }
          .button {
            display: inline-block;
            background-color: #f97316; /* Orange to match site theme */
            color: white;
            padding: 14px 32px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            font-size: 16px;
            transition: background-color 0.2s;
            margin: 10px 0;
          }
          .button:hover {
            background-color: #ea580c; /* Darker orange */
          }
          .mobile-only {
            margin-top: 30px;
            padding-top: 30px;
            border-top: 1px solid #e5e7eb;
          }
          .small {
            font-size: 14px;
            color: #9ca3af;
          }
          code {
            font-size: 12px; 
            word-break: break-all;
            background-color: #f3f4f6;
            padding: 8px;
            border-radius: 4px;
            display: inline-block;
            margin: 10px 0;
          }
        `}</style>
      </Head>
      <div className="container">
        <img src="/images/logo-final-01.png" alt="Bonnie's Logo" className="logo" />
        <h1>Reset Your Password</h1>
        <p>Click the button below to open the Bonnie's app and reset your password.</p>
        
        <a href="#" id="open-app-button" className="button">
          Open Bonnie's App
        </a>
        
        <div className="mobile-only">
          <p className="small">
            Make sure you have the Bonnie's mobile app installed.<br />
            <span id="countdown">You'll be redirected automatically in 5 seconds.</span>
          </p>
        </div>
        
        <div className="mobile-only">
          <p className="small">
            Having trouble? Copy this link and open it in your mobile browser:
          </p>
          <code id="fallback-link">com.bonnie.mobile://reset-password</code>
        </div>
      </div>
    </>
  );
}
