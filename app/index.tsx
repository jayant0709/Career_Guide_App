import React, { useRef, useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Testimonials from "@/components/landing/Testimonials";
import Footer from "@/components/landing/Footer";
import { FloatingChatButton } from "@/components/chat/FloatingChatButton";
import { ChatModal } from "@/components/chat/ChatModal";
import { colors, commonStyles } from "@/lib/utils";

export default function Index() {
  const scrollViewRef = useRef<ScrollView>(null);
  const router = useRouter();
  const [isChatModalVisible, setIsChatModalVisible] = useState(false);

  const scrollToSection = (sectionId: string) => {
    // For now, we'll handle basic navigation
    // In a more complex app, you might want to use react-native-super-grid or similar
    // to create proper section navigation
    switch (sectionId) {
      case "home":
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
        break;
      case "features":
        scrollViewRef.current?.scrollTo({ y: 800, animated: true });
        break;
      case "works":
        scrollViewRef.current?.scrollTo({ y: 1600, animated: true });
        break;
      case "testimonials":
        scrollViewRef.current?.scrollTo({ y: 2400, animated: true });
        break;
      default:
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }
  };

  return (
    <View style={[commonStyles.container]}>
      <Header onNavigate={scrollToSection} />
      <ScrollView
        ref={scrollViewRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Footer />
      </ScrollView>

      {/* Floating Chat Button */}
      <FloatingChatButton onPress={() => setIsChatModalVisible(true)} />

      {/* Chat Modal */}
      <ChatModal
        isVisible={isChatModalVisible}
        onClose={() => setIsChatModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
});
