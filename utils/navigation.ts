import { router } from 'expo-router';
import { Alert } from 'react-native';

/**
 * Enhanced navigation utility with error handling and animation support
 */
export class NavigationService {
  /**
   * Navigate to a screen with optional parameters
   */
  static navigate(screen: string, params?: any) {
    try {
      if (params) {
        router.push({ pathname: screen as any, params });
      } else {
        router.push(screen as any);
      }
    } catch (error) {
      console.warn(`Navigation to ${screen} failed:`, error);
      this.handleNavigationError(screen);
    }
  }

  /**
   * Replace current screen with a new one
   */
  static replace(screen: string, params?: any) {
    try {
      if (params) {
        router.replace({ pathname: screen as any, params });
      } else {
        router.replace(screen as any);
      }
    } catch (error) {
      console.warn(`Replace navigation to ${screen} failed:`, error);
      this.handleNavigationError(screen);
    }
  }

  /**
   * Go back to previous screen
   */
  static goBack() {
    try {
      if (router.canGoBack()) {
        router.back();
      } else {
        // Fallback to home if can't go back
        this.navigate('/(tabs)');
      }
    } catch (error) {
      console.warn('Go back failed:', error);
      this.navigate('/(tabs)');
    }
  }

  /**
   * Navigate to authentication flow
   */
  static goToAuth() {
    this.replace('/login');
  }

  /**
   * Navigate to main app after authentication
   */
  static goToApp() {
    this.replace('/(tabs)');
  }

  /**
   * Navigate to onboarding flow
   */
  static goToOnboarding() {
    this.replace('/onboarding');
  }

  /**
   * Quick navigation shortcuts for common actions
   */
  static shortcuts = {
    // Social features
    openMessaging: () => this.navigate('/messaging'),
    openChat: (chatId?: string) => this.navigate('/chat', { id: chatId }),
    openGroupChat: (groupId?: string) => this.navigate('/group-chat', { id: groupId }),
    openDirectMessage: (userId?: string) => this.navigate('/direct-message', { userId }),
    startNewMessage: () => this.navigate('/new-message'),

    // Groups and community
    discoverGroups: () => this.navigate('/discover-groups'),
    openGroup: (groupId?: string) => this.navigate('/group-page', { id: groupId }),
    openGroupFeed: (groupId?: string) => this.navigate('/feed-tab', { id: groupId }),
    requestGroupAccess: (groupId?: string) => this.navigate('/request-group-access', { id: groupId }),

    // Content creation and viewing
    createPost: () => this.navigate('/create-post'),
    viewPost: (postId?: string) => this.navigate('/view-post', { id: postId }),
    startLivePost: () => this.navigate('/live-post'),
    viewTrendingPosts: () => this.navigate('/trending-posts'),
    viewComments: (postId?: string) => this.navigate('/view-all-comments', { postId }),
    sharePost: (postId?: string) => this.navigate('/share-post', { postId }),

    // User profiles
    viewUserProfile: (userId?: string) => this.navigate('/user-profile', { id: userId }),
    editProfile: () => this.navigate('/profile-setup'),

    // Admin and management
    openAdminPanel: (groupId?: string) => this.navigate('/admin-panel', { groupId }),
    manageRoles: (groupId?: string) => this.navigate('/manage-member-roles', { groupId }),

    // Notifications
    openNotifications: () => this.navigate('/(tabs)/notifications'),
    openNotificationCenter: () => this.navigate('/notifications-center'),

    // Tab navigation
    goToHome: () => this.navigate('/(tabs)/index'),
    goToActivity: () => this.navigate('/(tabs)/activity'),
    goToChallenge: () => this.navigate('/(tabs)/challenge'),
    goToWorkouts: () => this.navigate('/(tabs)/workouts'),
    goToProfile: () => this.navigate('/(tabs)/profile'),
    goToExplore: () => this.navigate('/(tabs)/explore'),
    goToSettings: () => this.navigate('/(tabs)/settings'),
    goToTimer: () => this.navigate('/(tabs)/timer'),
  };
  /**
   * Handle navigation errors gracefully
   */
  private static handleNavigationError(screen: string) {
    Alert.alert(
      'Navigation Error',
      `Unable to navigate to ${screen}. Would you like to go home?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Go Home', onPress: () => this.navigate('/(tabs)') },
      ]
    );
  }

  /**
   * Check if user is authenticated (implement based on your auth logic)
   */
  static isAuthenticated(): boolean {
    // Implement your authentication check here
    // For now, return true as placeholder
    return true;
  }

  /**
   * Navigate with authentication check
   */
  static navigateWithAuth(screen: string, params?: any) {
    if (this.isAuthenticated()) {
      this.navigate(screen, params);
    } else {
      this.goToAuth();
    }
  }

  /**
   * Deep link handling
   */
  static handleDeepLink(url: string) {
    // Implement deep link parsing and navigation
    console.log('Handling deep link:', url);
    // Example implementation:
    // if (url.includes('/group/')) {
    //   const groupId = url.split('/group/')[1];
    //   this.shortcuts.openGroup(groupId);
    // }
  }

  /**
   * Tab Navigation Methods
   */
  static tabs = {
    home: () => NavigationService.navigate('/(tabs)/'),
    activity: () => NavigationService.navigate('/(tabs)/activity'),
    challenge: () => NavigationService.navigate('/(tabs)/challenge'),
    workouts: () => NavigationService.navigate('/(tabs)/workouts'),
    profile: () => NavigationService.navigate('/(tabs)/profile'),
    notifications: () => NavigationService.navigate('/(tabs)/notifications'),
    explore: () => NavigationService.navigate('/(tabs)/explore'),
    settings: () => NavigationService.navigate('/(tabs)/settings'),
    timer: () => NavigationService.navigate('/(tabs)/timer'),
  };

  /**
   * Authentication & Onboarding
   */
  static auth = {
    login: () => NavigationService.navigate('/login'),
    signup: () => NavigationService.navigate('/signup'),
    onboarding: () => NavigationService.navigate('/onboarding'),
    profileSetup: () => NavigationService.navigate('/profile-setup'),
    logout: () => NavigationService.replace('/login'),
  };

  /**
   * Social & Community Navigation
   */
  static social = {
    messaging: () => NavigationService.navigate('/messaging'),
    chat: (chatId?: string) => NavigationService.navigate('/chat', chatId ? { id: chatId } : undefined),
    directMessage: (userId?: string) => NavigationService.navigate('/direct-message', userId ? { userId } : undefined),
    groupChat: (groupId?: string) => NavigationService.navigate('/group-chat', groupId ? { id: groupId } : undefined),
    newMessage: () => NavigationService.navigate('/new-message'),
    discoverGroups: () => NavigationService.navigate('/discover-groups'),
    groupPage: (groupId?: string) => NavigationService.navigate('/group-page', groupId ? { id: groupId } : undefined),
    feedTab: (groupId?: string) => NavigationService.navigate('/feed-tab', groupId ? { groupId } : undefined),
    requestGroupAccess: (groupId?: string) => NavigationService.navigate('/request-group-access', groupId ? { groupId } : undefined),
  };

  /**
   * Content & Posts Navigation
   */
  static content = {
    createPost: (groupId?: string) => NavigationService.navigate('/create-post', groupId ? { groupId } : undefined),
    viewPost: (postId?: string) => NavigationService.navigate('/view-post', postId ? { id: postId } : undefined),
    livePost: () => NavigationService.navigate('/live-post'),
    trendingPosts: () => NavigationService.navigate('/trending-posts'),
    viewAllComments: (postId?: string) => NavigationService.navigate('/view-all-comments', postId ? { postId } : undefined),
    sharePost: (postId?: string) => NavigationService.navigate('/share-post', postId ? { postId } : undefined),
  };

  /**
   * Admin & Management Navigation
   */
  static admin = {
    adminPanel: (groupId?: string) => NavigationService.navigate('/admin-panel', groupId ? { groupId } : undefined),
    manageMemberRoles: (groupId?: string, memberId?: string) => {
      const params: any = {};
      if (groupId) params.groupId = groupId;
      if (memberId) params.memberId = memberId;
      NavigationService.navigate('/manage-member-roles', Object.keys(params).length ? params : undefined);
    },
  };

  /**
   * User Profile Navigation
   */
  static profiles = {
    userProfile: (userId?: string) => NavigationService.navigate('/user-profile', userId ? { id: userId } : undefined),
    notificationsCenter: () => NavigationService.navigate('/notifications-center'),
  };
}

/**
 * Hook for navigation with error handling
 */
export const useNavigation = () => {
  return {
    navigate: NavigationService.navigate,
    replace: NavigationService.replace,
    goBack: NavigationService.goBack,
    shortcuts: NavigationService.shortcuts,
  };
};

// Export convenience functions
export const navigate = NavigationService.navigate;
export const goBack = NavigationService.goBack;
export const shortcuts = NavigationService.shortcuts;
