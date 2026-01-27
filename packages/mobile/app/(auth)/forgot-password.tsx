import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '../../src/components/ui/Text';
import { Input } from '../../src/components/ui/Input';
import { Button } from '../../src/components/ui/Button';
import { Colors, Spacing } from '../../src/constants/colors';
import { authApi } from '../../src/api/auth';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await authApi.forgotPassword(email);
      setSent(true);
    } catch (error) {
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'Please try again'
      );
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text color="deepIndigo" weight="semibold">Back</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.successIcon}>
            <Text variant="h1" color="white">!</Text>
          </View>
          <Text variant="h2" align="center">Check your email</Text>
          <Text variant="body" color="gray600" align="center" style={styles.subtitle}>
            We've sent password reset instructions to {email}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Back to Login"
            onPress={() => router.push('/(auth)/login')}
            size="lg"
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text color="deepIndigo" weight="semibold">Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text variant="h2">Forgot password?</Text>
        <Text variant="body" color="gray600" style={styles.subtitle}>
          Enter your email and we'll send you instructions to reset your password
        </Text>

        <Input
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          error={error}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Send Reset Link"
          onPress={handleSubmit}
          loading={loading}
          size="lg"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  subtitle: {
    marginTop: Spacing.xs,
    marginBottom: Spacing.xl,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary.emerald,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: Spacing.lg,
  },
  buttonContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
  },
});
