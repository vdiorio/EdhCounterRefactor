import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import AppModal from "@/components/ui/AppModal";
import { useEffect, useState } from "react";
import WheelPicker from "react-native-wheely";
import { Link } from "expo-router";
import AltSelector from "@/components/AltOptions";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Typography from "@/components/ui/Typography";
import useAppColors from "@/hooks/useAppColors";
import { useTranslation } from 'react-i18next';
import { AVAILABLE_LANGUAGES } from '@/i18n';
import { usePreferencesStore } from '@/store/PreferencesStore';

export default function GameSelectors() {
  const { t } = useTranslation();
  const options = Array.from(new Array(5)).map(
    (_, index) => t('player_count_option', { count: index + 2 })
  );
  const [selected, setSelected] = useState(2);
  const [alternative, setAlternative] = useState("f");
  const [langModalVisible, setLangModalVisible] = useState(false);
  const colors = useAppColors();
  const language = usePreferencesStore((s) => s.language);
  const setLanguage = usePreferencesStore((s) => s.setLanguage);

  const handleSelectionChange = (index: number) => {
    setSelected(index);
    setAlternative("f");
  };

  useEffect(() => {
    console.log("Selected player count:", selected + 1);
  }, [alternative]);

  const scaleFunction = (x: number) => {
    return 0.7 * x; // Slightly larger for better visibility
  };

  return (
    <LinearGradient
      colors={[colors.background, colors.backgroundGradient]}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.langButton}
          onPress={() => setLangModalVisible(true)}
          accessibilityLabel={t('language')}
        >
          <Ionicons name="globe-outline" size={22} color={colors.textSecondary} />
          <Text style={styles.flagText}>
            {AVAILABLE_LANGUAGES.find((l) => l.code === language)?.flag}
          </Text>
        </TouchableOpacity>
        <Typography style={[styles.title, { color: colors.primary }]}>
          {t('app_title')}
        </Typography>
        <Typography style={[styles.subtitle, { color: colors.textSecondary }]}>
          {t('subtitle')}
        </Typography>
      </View>

      <AppModal visible={langModalVisible} onClose={() => setLangModalVisible(false)} title={t('language')}>
        {AVAILABLE_LANGUAGES.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={styles.langOption}
            onPress={() => {
              setLanguage(lang.code);
              setLangModalVisible(false);
            }}
          >
            <View style={styles.langOptionLeft}>
              <Text style={styles.flagText}>{lang.flag}</Text>
              <Text style={[styles.langOptionText, { color: colors.text }]}>{lang.name}</Text>
            </View>
            {language === lang.code && (
              <Ionicons name="checkmark" size={18} color={colors.primary} />
            )}
          </TouchableOpacity>
        ))}
      </AppModal>

      <View style={styles.content}>
        <View style={styles.sectionContainer}>
          <Typography style={[styles.sectionTitle, { color: colors.text }]}>
            {t('player_count_label')}
          </Typography>
          <View
            style={[
              styles.wheelContainer,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <WheelPicker
              options={options}
              selectedIndex={selected}
              onChange={handleSelectionChange}
              scaleFunction={scaleFunction}
              visibleRest={1}
              itemTextStyle={{
                fontSize: 20,
                color: colors.textMuted,
                fontWeight: "400",
              }}
              selectedTextStyle={{
                fontSize: 26,
                color: "#121212",
                fontWeight: "700",
              }}
              itemHeight={50}
            />
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Typography style={[styles.sectionTitle, { color: colors.text }]}>
            {t('table_layout_label')}
          </Typography>
          <View style={styles.altContainer}>
            <AltSelector
              onChange={(alt) => setAlternative(alt ? "v" : "f")}
              playerCount={selected + 2}
              alt={alternative === "v"}
              colors={colors}
            />
          </View>
        </View>

        <Link
          push
          href={{
            pathname: "/Pages/GameScreen",
            params: { playerCount: selected + 2, alternative },
          }}
          asChild
        >
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              margin: "auto",
              padding: 20,
              borderRadius: 10,
            }}
          >
            <View style={styles.buttonContent}>
              <Ionicons name="play" size={24} color={colors.text} />
              <Typography
                style={[
                  styles.buttonText,
                  {
                    color: colors.text,
                  },
                ]}
              >
                {t('start_game')}
              </Typography>
            </View>
          </TouchableOpacity>
        </Link>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: "center",
  },
  langButton: {
    position: "absolute",
    top: 60,
    right: 20,
    padding: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  flagText: {
    fontSize: 18,
  },
  langOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  langOptionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  langOptionText: {
    fontSize: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: "400",
  },
  content: {
    flex: 1,
    width: "100%",
    justifyContent: "space-evenly",
  },
  sectionContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 16,
    letterSpacing: 1,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  wheelContainer: {
    width: "100%",
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  altContainer: {
    width: "100%",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  startButton: {
    width: "85%",
    height: 58,
    borderRadius: 29,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: "600",
  },
  footer: {
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
  },
});
