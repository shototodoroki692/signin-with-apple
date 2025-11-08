import { Image } from 'expo-image';
import { Platform, StyleSheet, View } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication'

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import MessageContainer from '@/components/customs/message-container';
import { useEffect, useState } from 'react';

// constantes
const LAN_BACKEND_IP_ADDR = process.env.EXPO_PUBLIC_LAN_BACKEND_IP_ADDR;
const BACKEND_DOMAIN_NAME = `http://${LAN_BACKEND_IP_ADDR}:3000`;

// débug
console.log("LAN_BACKEND_IP_ADDR:", LAN_BACKEND_IP_ADDR);
console.log("BACKEND_DOMAIN_NAME:", BACKEND_DOMAIN_NAME);

export default function HomeScreen() {
  // état du chargement de la page
  const [isLoading, setLoading] = useState<boolean>(false);

  // état du serveur API
  const [isBackendAvailable, setBackendAvailable] = useState<boolean>(false);

  // test d'accès au backend
  async function getBackendPublicEndpoint() {
    try {
      const response = await fetch(BACKEND_DOMAIN_NAME)
      response.status === 200 ? setBackendAvailable(true) : setBackendAvailable(false);

      // débug
      console.log("tentative d'accès au endpoint public de notre api:");
      console.log("status de la réponse:", response.status);
    } catch (e) {
      // débug
      console.log("erreur lors de la demande d'accès au endpoint public de notre api:\n", e);

      setBackendAvailable(false);
    } finally {
      setLoading(false);
    }
  }

  // test du serveur API
  useEffect(() => {
    getBackendPublicEndpoint();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12',
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Link href="/modal">
          <Link.Trigger>
            <ThemedText type="subtitle">Step 2: Explore</ThemedText>
          </Link.Trigger>
          <Link.Preview />
          <Link.Menu>
            <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
            <Link.MenuAction
              title="Share"
              icon="square.and.arrow.up"
              onPress={() => alert('Share pressed')}
            />
            <Link.Menu title="More" icon="ellipsis">
              <Link.MenuAction
                title="Delete"
                icon="trash"
                destructive
                onPress={() => alert('Delete pressed')}
              />
            </Link.Menu>
          </Link.Menu>
        </Link>

        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>

      {/* Affichage du status du serveur */}
      <MessageContainer 
        message={isBackendAvailable ? 'Serveur backend disponible' : 'Serveur backend indisponible'}
        type={isBackendAvailable ? 'success' : 'error'}
      />

      {/* Bouton de connexion avec Apple */}
      <View style={styles.container}>
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN} 
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
          cornerRadius={5}
          style={styles.button}
          onPress={async () => {
            try {
              const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                  AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                  AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
              });
              // signed in

              // débug
              console.log("credentials récupérés:\n", credential)

            } catch (e) {
              // débug
              console.log("erreur survenue lors de l'authentification avec apple")
            }
          }}
        />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '100%',
    height: 50,
  },
});
