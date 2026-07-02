import { StyleSheet, Dimensions } from 'react-native';
import { colors, shadows } from '../../theme';

const { height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  mainWrapper: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: height * 0.04,
    justifyContent: 'space-between', // Distributes sections to fill screen
  },
  topSection: {
    alignItems: 'center',
  },
  profileHeader: {
    alignItems: 'center',
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.medium,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  editBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: colors.primary,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.white,
  },
  nameText: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.5,
  },
  emailText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
    marginTop: 4,
  },
  middleSection: {
    flex: 1,
    justifyContent: 'center', // Centers cards in the middle of available space
    paddingVertical: 20,
  },
  infoGroup: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
    marginBottom: 10,
    letterSpacing: 1,
    marginLeft: 4,
  },
  sectionCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.soft,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardMainText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  cardSubText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  phoneWrapper: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.soft,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
  },
  phoneText: {
    fontSize: 15,
    color: colors.textPrimary,
    marginLeft: 14,
    fontWeight: '600',
  },
  rowCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...shadows.soft,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
  },
  rowMainText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  rowSubText: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  bottomSection: {
    alignItems: 'center',
  },
  logoutBtn: {
    width: '100%',
    height: 58,
    backgroundColor: colors.surface,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.errorLight,
    marginBottom: 16,
  },
  logoutBtnText: {
    color: colors.error,
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 10,
  },
  versionText: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '500',
  },
});
