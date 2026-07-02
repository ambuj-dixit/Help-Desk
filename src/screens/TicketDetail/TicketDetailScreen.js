/**
 * Ticket Detail Screen
 * Optimized multi-role logic for Managers, Developers, and Clients.
 * Handles: Self-Assignment, Dev-Assignment, Status Transitions, and Approval Loops.
 */

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import styles from './style';
import Header from '../../components/Header';
import { colors } from '../../theme';
import { updateTicketStatus } from '../../store/slices/ticketSlice';

const TicketDetailScreen = ({ onBack }) => {
  const dispatch = useDispatch();
  const { currentTicket, loading } = useSelector((state) => state.tickets);
  const { user, role } = useSelector((state) => state.auth);

  const isManager = role === 'ADMIN' || role === 'PM';
  const isAssignee = user?.UserId === currentTicket?.AssignedToID;
  const isClient = role === 'CLIENT';

  // State for Role normalizer
  const status = currentTicket?.Status?.toUpperCase();

  /**
   * Logical Action Handlers
   */
  const handleAction = (actionType) => {
    let newStatus = '';
    let assigneeId = currentTicket.AssignedToID;

    switch (actionType) {
      case 'SELF_ASSIGN':
        newStatus = 'ASSIGNED';
        assigneeId = user.UserId;
        break;
      case 'MARK_FIXED':
        newStatus = 'FIXED';
        break;
      case 'APPROVE_MGR':
        newStatus = 'PENDING_PREVIEW';
        break;
      case 'REJECT_MGR':
        newStatus = 'REWORK';
        break;
      case 'APPROVE_CLIENT':
        newStatus = 'CLOSED';
        break;
      case 'REOPEN_CLIENT':
        newStatus = 'REOPENED';
        break;
    }

    dispatch(updateTicketStatus({
      ticketId: currentTicket.TicketID,
      status: newStatus,
      assigneeId: assigneeId
    }));
  };

  /**
   * Renders specific buttons based on Role + Status context
   */
  const renderActions = () => {
    if (loading) return <ActivityIndicator color={colors.primary} />;

    // 1. MANAGER LOGIC
    if (isManager) {
      if (status === 'NEW' || status === 'REOPENED') {
        return (
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.secondaryBtn} onPress={() => {}}>
              <Text style={styles.secondaryBtnText}>Assign Dev</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.primaryBtn} onPress={() => handleAction('SELF_ASSIGN')}>
              <Icon name="user-check" size={18} color={colors.white} />
              <Text style={styles.btnText}>Self Assign</Text>
            </TouchableOpacity>
          </View>
        );
      }
      if (status === 'FIXED') {
        return (
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.dangerBtn} onPress={() => handleAction('REJECT_MGR')}>
              <Text style={styles.dangerBtnText}>Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.primaryBtn} onPress={() => handleAction('APPROVE_MGR')}>
              <Icon name="check" size={18} color={colors.white} />
              <Text style={styles.btnText}>Approve to Client</Text>
            </TouchableOpacity>
          </View>
        );
      }
    }

    // 2. ASSIGNEE LOGIC (Developer or Self-Assigned Manager)
    if (isAssignee && (status === 'ASSIGNED' || status === 'REWORK')) {
      return (
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => handleAction('MARK_FIXED')}>
            <Icon name="zap" size={18} color={colors.white} />
            <Text style={styles.btnText}>Mark as Fixed</Text>
          </TouchableOpacity>
        </View>
      );
    }

    // 3. CLIENT LOGIC
    if (isClient && status === 'PENDING_PREVIEW') {
      return (
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.secondaryBtn} onPress={() => handleAction('REOPEN_CLIENT')}>
            <Text style={styles.secondaryBtnText}>Reopen</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => handleAction('APPROVE_CLIENT')}>
            <Icon name="thumbs-up" size={18} color={colors.white} />
            <Text style={styles.btnText}>Approve & Close</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header title="Ticket Details" showBack={true} onBack={onBack} />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.statusHeader}>
          <Text style={styles.ticketId}>#{currentTicket?.TicketID || 'TKT-000'}</Text>
          <View style={[styles.badge, { backgroundColor: colors.primaryLight }]}>
            <Text style={[styles.badgeText, { color: colors.primary }]}>{status}</Text>
          </View>
        </View>

        <View style={styles.titleCard}>
          <Text style={styles.titleText}>{currentTicket?.Title || 'Issue Summary'}</Text>
          <Text style={styles.description}>
            {currentTicket?.Description || 'No detailed description provided.'}
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={[styles.sectionTitle, { marginBottom: 15, fontSize: 14, color: colors.textMuted }]}>TICKET METADATA</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Product</Text>
            <Text style={styles.infoValue}>{currentTicket?.ProductName || 'Main System'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Company</Text>
            <Text style={styles.infoValue}>{currentTicket?.CompanyName || 'Internal'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Assigned To</Text>
            <Text style={styles.infoValue}>{currentTicket?.AssignedToName || 'Unassigned'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Priority</Text>
            <Text style={[styles.infoValue, { color: colors.error }]}>High</Text>
          </View>
        </View>
      </ScrollView>

      {/* Dynamic Actions for Workflow Loop */}
      {renderActions()}
    </SafeAreaView>
  );
};

export default TicketDetailScreen;
