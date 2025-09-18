import React, { useState } from "react";
import { Alert } from "react-native";
import { router } from "expo-router";
import AuthCard from "@/components/auth/AuthCard";
import AuthForm, { SignInFormData } from "@/components/auth/AuthForm";
import { useAuth } from "@/contexts/AuthContext";
import { validateSigninData } from "@/utils/validators";

export default function SignInPage() {
  const { signin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (data: SignInFormData) => {
    // Client-side validation
    const validation = validateSigninData({
      identifier: data.usernameOrEmail,
      password: data.password,
    });

    if (!validation.isValid) {
      Alert.alert("Validation Error", validation.errors.join("\n"));
      return;
    }

    setIsLoading(true);

    try {
      const result = await signin(data.usernameOrEmail, data.password);

      if (result.success) {
        Alert.alert("Success", "Welcome back!", [
          {
            text: "OK",
            onPress: () => router.replace("/"),
          },
        ]);
      } else {
        Alert.alert("Sign In Failed", result.error || "Invalid credentials");
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard
      title="Welcome Back"
      subtitle="Continue your personalized career journey"
    >
      <AuthForm
        variant="signin"
        onSubmit={handleSignIn}
        isLoading={isLoading}
      />
    </AuthCard>
  );
}
