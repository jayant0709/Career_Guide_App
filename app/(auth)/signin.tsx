import React from "react";
import AuthCard from "@/components/auth/AuthCard";
import AuthForm, { SignInFormData } from "@/components/auth/AuthForm";
import { Alert } from "react-native";

export default function SignInPage() {
  const handleSignIn = (data: any) => {
    console.log("Sign in data:", data);
    // Here you would typically make an API call to authenticate the user
    Alert.alert("Success", "User authentication successful!");
  };

  return (
    <AuthCard
      title="Welcome Back"
      subtitle="Continue your personalized career journey"
    >
      <AuthForm variant="signin" onSubmit={handleSignIn} />
    </AuthCard>
  );
}
