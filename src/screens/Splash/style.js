import { StyleSheet, Dimensions } from 'react-native';
import { colors, shadows } from '../../theme';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 60,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 120,
    height: 120,
    backgroundColor: colors.surface,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.medium,
    marginBottom: 24,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    letterSpacing: 2,
    marginTop: 8,
    textTransform: 'uppercase',
  },
  bottomContainer: {
    width: '100%',
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: 56,
    backgroundColor: colors.primaryDark,
    borderRadius: 28,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.soft,
    shadowOpacity: 0.2,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  footerText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 16,
    fontWeight: '500',
  },
});
