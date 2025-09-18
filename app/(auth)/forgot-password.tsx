import React from "react";
import AuthCard from "@/components/auth/AuthCard";
import AuthForm from "@/components/auth/AuthForm";
import { Alert } from "react-native";

export default function ForgotPasswordPage() {
  const handleForgotPassword = (data: any) => {
    console.log("Reset link sent to:", data.email);
    // Here you would typically make an API call to send the reset email
    Alert.alert("Success", "Password reset email sent successfully!");
  };

  return (
    <AuthCard
      title="Reset Password"
      subtitle="Enter your email to receive a password reset link"
    >
      <AuthForm variant="forgot-password" onSubmit={handleForgotPassword} />
    </AuthCard>
  );
}
