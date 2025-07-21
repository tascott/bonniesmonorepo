'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function PasswordResetContent() {
  const searchParams = useSearchParams();
  const confirmationUrl = searchParams.get('confirmation_url');

  useEffect(() => {
    const errorMessage = document.getElementById('error-message');
    
    if (confirmationUrl) {
      const button = document.getElementById('open-app-button');
      const codeElement = document.getElementById('fallback-link');
      const countdownElement = document.getElementById('countdown');

      if (button && codeElement && countdownElement) {
        button.setAttribute('href', confirmationUrl);
        codeElement.textContent = confirmationUrl;

        let seconds = 3;
        const countdown = setInterval(() => {
          seconds--;
          if (seconds > 0) {
            countdownElement.textContent = `You'll be redirected automatically in ${seconds} seconds.`;
          } else {
            countdownElement.textContent = 'Redirecting now...';
            clearInterval(countdown);
            window.location.href = confirmationUrl;
          }
        }, 1000);

        return () => clearInterval(countdown);
      }
    } else if (errorMessage) {
      errorMessage.style.display = 'block';
    }
  }, [confirmationUrl]);

  return (
    <>
      <style>{`
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
        .error {
          background-color: #fef2f2;
          border: 1px solid #fecaca;
          color: #dc2626;
          padding: 12px;
          border-radius: 6px;
          margin-bottom: 20px;
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
      <div className="container">
        <img src="/images/logo-final-01.png" alt="Bonnie's Logo" className="logo" />
        
        <div id="error-message" className="error" style={{ display: 'none' }}>
          <p>Invalid reset link. Please request a new password reset from the app.</p>
        </div>
        
        <h1>Reset Your Password</h1>
        <p>Click the button below to continue with your password reset.</p>
        
        <a href="#" id="open-app-button" className="button">
          Continue Password Reset
        </a>
        
        <div className="mobile-only">
          <p className="small">
            This will redirect you to complete your password reset.<br />
            <span id="countdown">You'll be redirected automatically in 3 seconds.</span>
          </p>
        </div>
        
        <div className="mobile-only">
          <p className="small">
            Having trouble? Copy this link and open it in your mobile browser:
          </p>
          <code id="fallback-link"></code>
        </div>
      </div>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PasswordResetContent />
    </Suspense>
  );
}
