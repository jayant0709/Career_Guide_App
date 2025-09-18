import React from "react";
import AuthCard from "@/components/auth/AuthCard";
import AuthForm from "@/components/auth/AuthForm";
import { Alert } from "react-native";

export default function SignUpPage() {
  const handleSignUp = (data: any) => {
    console.log("Sign up data:", data);
    // Here you would typically make an API call to register the user
    Alert.alert("Success", "User registration successful!");
  };

  return (
    <AuthCard
      title="Create Your Account"
      subtitle="Start your career journey with personalized guidance"
    >
      <AuthForm variant="signup" onSubmit={handleSignUp} />
    </AuthCard>
  );
}
