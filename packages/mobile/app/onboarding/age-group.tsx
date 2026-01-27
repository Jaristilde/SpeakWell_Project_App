import { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Text } from '../../src/components/ui/Text';
import { Button } from '../../src/components/ui/Button';
import { Colors, Spacing } from '../../src/constants/colors';

// Gender-balanced age groups: 2 female, 2 male (alternating)
const AGE_GROUPS = [
  {
    id: 'teen',
    label: 'Teen (10-17)',
    gender: 'female',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face',
    description: 'Perfect for students',
  },
  {
    id: 'young-adult',
    label: 'Young Adult (18-30)',
    gender: 'male',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    description: 'Starting your career',
  },
  {
    id: 'adult',
    label: 'Professional (31-50)',
    gender: 'female',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
    description: 'Growing professionally',
  },
  {
    id: 'mature',
    label: 'Experienced (51+)',
    gender: 'male',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    description: 'Seasoned leader',
  },
];

export default function AgeGroupScreen() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const handleContinue = () => {
    router.push({
      pathname: '/onboarding/goals',
      params: { ageGroup: selected },
    });
  };

  return (
    <SafeAreaView style= { styles.container } >
    <View style={ styles.progress }>
      <View style={ styles.progressBar }>
        <View style={ [styles.progressFill, { width: '33%' }] } />
          </View>
          < Text variant = "caption" color = "gray600" >
            Step 1 of 3
              </Text>
              </View>

              < View style = { styles.content } >
                <Text variant="h2" style = { styles.heading } > What's your age group?</Text>
                  < Text variant = "body" color = "gray600" style = { styles.subtitle } >
                    This helps us personalize your learning experience
                      </Text>

                      < View style = { styles.options } >
                      {
                        AGE_GROUPS.map((group) => (
                          <TouchableOpacity
              key= { group.id }
              style = {
                            [
                            styles.optionCard,
                            selected === group.id && styles.optionCardSelected,
              ]}
              onPress = {() => setSelected(group.id)}
  activeOpacity = { 0.8}
    >
    <View style={
      [
        styles.imageContainer,
        selected === group.id && styles.imageContainerSelected,
      ]
  }>
    <Image
                  source={ { uri: group.imageUrl } }
  style = { styles.profileImage }
  resizeMode = "cover"
    />
    </View>
    < View style = { styles.optionTextContainer } >
      <Text
                  variant="body"
  weight = "semibold"
  color = { selected === group.id ? 'white' : 'charcoal'
}
                >
  { group.label }
  </Text>
  < Text
variant = "caption"
color = { selected === group.id ? 'white' : 'gray600'}
style = {{ opacity: selected === group.id ? 0.9 : 0.7 }}
                >
  { group.description }
  </Text>
  </View>
{
  selected === group.id && (
    <View style={ styles.checkmark }>
      <Text variant="caption" color = "white" weight = "bold" >✓</Text>
        </View>
              )
}
</TouchableOpacity>
          ))}
</View>
  </View>

  < View style = { styles.footer } >
    <Button
          title="Continue"
onPress = { handleContinue }
disabled = {!selected}
size = "lg"
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
  progress: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: Colors.neutral.gray200,
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primary.deepIndigo,
    borderRadius: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  heading: {
    textAlign: 'center',
  },
  subtitle: {
    marginTop: Spacing.xs,
    marginBottom: Spacing.xl,
    textAlign: 'center',
  },
  options: {
    gap: Spacing.md,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral.gray100,
    borderRadius: 16,
    padding: Spacing.md,
    borderWidth: 3,
    borderColor: 'transparent',
    gap: Spacing.md,
  },
  optionCardSelected: {
    backgroundColor: Colors.primary.deepIndigo,
    borderColor: Colors.primary.deepTeal,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: Colors.neutral.gray200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainerSelected: {
    borderColor: Colors.primary.deepTeal,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  optionTextContainer: {
    flex: 1,
    gap: 2,
  },
  checkmark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary.emerald,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    padding: Spacing.lg,
  },
});
