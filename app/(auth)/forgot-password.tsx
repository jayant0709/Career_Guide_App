import React, { useState } from "react";
import { Alert } from "react-native";
import { router } from "expo-router";
import AuthCard from "@/components/auth/AuthCard";
import AuthForm, { ForgotPasswordFormData } from "@/components/auth/AuthForm";
import { useAuth } from "@/contexts/AuthContext";
import { validateForgotPasswordData } from "@/utils/validators";

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (data: ForgotPasswordFormData) => {
    // Client-side validation
    const validation = validateForgotPasswordData({
      email: data.email,
    });

    if (!validation.isValid) {
      Alert.alert("Validation Error", validation.errors.join("\n"));
      return;
    }

    setIsLoading(true);

    try {
      const result = await forgotPassword(data.email);

      if (result.success) {
        Alert.alert(
          "Reset Link Sent",
          "If an account with this email exists, you will receive a password reset link shortly.",
          [
            {
              text: "OK",
              onPress: () => router.push("/(auth)/signin"),
            },
          ]
        );
      } else {
        Alert.alert("Error", result.error || "Failed to send reset email");
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard
      title="Reset Password"
      subtitle="Enter your email to receive a password reset link"
    >
      <AuthForm
        variant="forgot-password"
        onSubmit={handleForgotPassword}
        isLoading={isLoading}
      />
    </AuthCard>
  );
}
