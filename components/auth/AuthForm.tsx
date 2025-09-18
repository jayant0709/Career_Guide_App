import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { colors } from "@/lib/utils";

export interface SignUpFormData {
  username: string;
  email: string;
  password: string;
}

export interface SignInFormData {
  usernameOrEmail: string;
  password: string;
}

export interface ForgotPasswordFormData {
  email: string;
}

interface SignUpAuthFormProps {
  variant: "signup";
  onSubmit: (data: SignUpFormData) => void;
  isLoading?: boolean;
}

interface SignInAuthFormProps {
  variant: "signin";
  onSubmit: (data: SignInFormData) => void;
  isLoading?: boolean;
}

interface ForgotPasswordAuthFormProps {
  variant: "forgot-password";
  onSubmit: (data: ForgotPasswordFormData) => void;
  isLoading?: boolean;
}

type AuthFormProps =
  | SignUpAuthFormProps
  | SignInAuthFormProps
  | ForgotPasswordAuthFormProps;

export default function AuthForm({
  variant,
  onSubmit,
  isLoading: externalLoading,
}: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const loading = externalLoading || isLoading;

  const handleFormSubmit = async (data: any) => {
    if (externalLoading) {
      // If external loading is provided, don't manage internal loading
      onSubmit(data);
    } else {
      setIsLoading(true);
      // Simulate loading
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSubmit(data);
      setIsLoading(false);
    }
  };

  const renderSignUpForm = () => (
    <View style={styles.form}>
      <View style={styles.fieldContainer}>
        <Label required>Username</Label>
        <Controller
          control={control}
          name="username"
          rules={{
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Choose a username"
              autoCapitalize="none"
              autoCorrect={false}
              error={!!errors.username}
            />
          )}
        />
        {errors.username && (
          <Text style={styles.errorText}>
            {errors.username.message as string}
          </Text>
        )}
      </View>

      <View style={styles.fieldContainer}>
        <Label required>Email</Label>
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              error={!!errors.email}
            />
          )}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message as string}</Text>
        )}
      </View>

      <View style={styles.fieldContainer}>
        <Controller
          control={control}
          name="password"
          rules={{
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <PasswordInput
              label="Password"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              required
              error={errors.password?.message as string}
            />
          )}
        />
      </View>

      <Button
        title="Sign Up"
        onPress={handleSubmit(handleFormSubmit)}
        disabled={loading}
        loading={loading}
        style={styles.submitButton}
      />

      <View style={styles.linkContainer}>
        <Text style={styles.linkText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/signin")}>
          <Text style={styles.link}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSignInForm = () => (
    <View style={styles.form}>
      <View style={styles.fieldContainer}>
        <Label required>Username or Email</Label>
        <Controller
          control={control}
          name="usernameOrEmail"
          rules={{
            required: "Username or email is required",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Enter username or email"
              autoCapitalize="none"
              autoCorrect={false}
              error={!!errors.usernameOrEmail}
            />
          )}
        />
        {errors.usernameOrEmail && (
          <Text style={styles.errorText}>
            {errors.usernameOrEmail.message as string}
          </Text>
        )}
      </View>

      <View style={styles.fieldContainer}>
        <Controller
          control={control}
          name="password"
          rules={{
            required: "Password is required",
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <PasswordInput
              label="Password"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              required
              error={errors.password?.message as string}
            />
          )}
        />
      </View>

      <View style={styles.forgotPasswordContainer}>
        <TouchableOpacity
          onPress={() => router.push("/(auth)/forgot-password" as any)}
        >
          <Text style={styles.link}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <Button
        title="Sign In"
        onPress={handleSubmit(handleFormSubmit)}
        disabled={loading}
        loading={loading}
        style={styles.submitButton}
      />

      <View style={styles.linkContainer}>
        <Text style={styles.linkText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/signup" as any)}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderForgotPasswordForm = () => (
    <View style={styles.form}>
      <View style={styles.fieldContainer}>
        <Label required>Email</Label>
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              error={!!errors.email}
            />
          )}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message as string}</Text>
        )}
      </View>

      <Button
        title="Send Reset Link"
        onPress={handleSubmit(handleFormSubmit)}
        disabled={loading}
        loading={loading}
        style={styles.submitButton}
      />

      <View style={styles.linkContainer}>
        <Text style={styles.linkText}>Remember your password? </Text>
        <TouchableOpacity onPress={() => router.push("/(auth)/signin")}>
          <Text style={styles.link}>Back to sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      {variant === "signup" && renderSignUpForm()}
      {variant === "signin" && renderSignInForm()}
      {variant === "forgot-password" && renderForgotPasswordForm()}
    </>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 20,
  },
  fieldContainer: {
    gap: 8,
  },
  submitButton: {
    marginTop: 8,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  linkText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  link: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "600",
  },
  errorText: {
    color: colors.red,
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  },
});
