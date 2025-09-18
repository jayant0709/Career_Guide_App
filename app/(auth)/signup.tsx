import React, { useState } from "react";
import { Alert } from "react-native";
import { router } from "expo-router";
import AuthCard from "@/components/auth/AuthCard";
import AuthForm, { SignUpFormData } from "@/components/auth/AuthForm";
import { useAuth } from "@/contexts/AuthContext";
import { validateSignupData } from "@/utils/validators";

export default function SignUpPage() {
  const { signup } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (data: SignUpFormData) => {
    // Client-side validation
    const validation = validateSignupData({
      username: data.username,
      email: data.email,
      password: data.password,
    });

    if (!validation.isValid) {
      Alert.alert("Validation Error", validation.errors.join("\n"));
      return;
    }

    setIsLoading(true);

    try {
      const result = await signup(data.username, data.email, data.password);

      if (result.success) {
        Alert.alert("Success", "Welcome to CareerSarthi!", [
          {
            text: "OK",
            onPress: () => router.replace("/"),
          },
        ]);
      } else {
        Alert.alert("Sign Up Failed", result.error || "Registration failed");
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard
      title="Create Your Account"
      subtitle="Start your career journey with personalized guidance"
    >
      <AuthForm
        variant="signup"
        onSubmit={handleSignUp}
        isLoading={isLoading}
      />
    </AuthCard>
  );
}
