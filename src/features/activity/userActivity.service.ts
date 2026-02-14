/**
 * Firebase Service - User Activity
 */

import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  getDocs,
  Timestamp,
  limit,
} from 'firebase/firestore';
import { firestore } from '../../firebase';
import type { 
  UserActivity, 
  UserActivityInput,
} from './userActivity.model';
import { 
  UserActivityValidator,
  ActivityType,
  UserRole 
} from './userActivity.model';

const COLLECTION_NAME = 'userActivities';

export const logUserActivity = async (
  input: UserActivityInput
): Promise<{ success: boolean; activityId?: string; errors?: string[] }> => {
  try {
    const validation = UserActivityValidator.validate(input);
    if (!validation.valid) {
      return { success: false, errors: validation.errors };
    }
    
    const isDuplicate = await checkDuplicateActivity(
      input.userId,
      input.activityType,
      input.page
    );
    
    if (isDuplicate) {
      return { 
        success: false, 
        errors: ['פעילות זהה כבר נרשמה ברגעים האחרונים'] 
      };
    }
    
    const activity: Omit<UserActivity, 'activityId'> = {
      userId: input.userId,
      userRole: input.userRole,
      activityType: input.activityType,
      description: input.description,
      page: input.page,
      timestamp: Timestamp.now(),
      ...(input.eventId && { eventId: input.eventId })
    };
    
    const docRef = await addDoc(collection(firestore, COLLECTION_NAME), activity);
    
    return { 
      success: true, 
      activityId: docRef.id 
    };
  } catch (error) {
    console.error('Error logging user activity:', error);
    return { 
      success: false, 
      errors: ['שגיאה ברישום הפעילות. אנא נסה שוב.'] 
    };
  }
};

const checkDuplicateActivity = async (
  userId: string,
  activityType: ActivityType,
  page: string
): Promise<boolean> => {
  try {
    const oneSecondAgo = new Date(Date.now() - 1000);
    
    const q = query(
      collection(firestore, COLLECTION_NAME),
      where('userId', '==', userId),
      where('activityType', '==', activityType),
      where('page', '==', page),
      where('timestamp', '>=', Timestamp.fromDate(oneSecondAgo))
    );
    
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  } catch (error) {
    console.error('Error checking duplicate activity:', error);
    return false;
  }
};

export const getUserActivities = async (
  userId: string,
  limitCount: number = 50
): Promise<UserActivity[]> => {
  try {
    const q = query(
      collection(firestore, COLLECTION_NAME),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    );
    
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      activityId: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp.toDate()
    })) as UserActivity[];
  } catch (error) {
    console.error('Error fetching user activities:', error);
    return [];
  }
};

export const getActivitiesByType = async (
  userId: string,
  activityType: ActivityType
): Promise<UserActivity[]> => {
  try {
    const q = query(
      collection(firestore, COLLECTION_NAME),
      where('userId', '==', userId),
      where('activityType', '==', activityType),
      orderBy('timestamp', 'desc')
    );
    
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      activityId: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp.toDate()
    })) as UserActivity[];
  } catch (error) {
    console.error('Error fetching activities by type:', error);
    return [];
  }
};

export interface ActivityStats {
  totalActivities: number;
  pageViews: number;
  courseViews: number;
  searches: number;
  calculatorUses: number;
  contactForms: number;
  eventRegistrations: number;
}

export const getUserActivityStats = async (
  userId: string
): Promise<ActivityStats> => {
  try {
    const activities = await getUserActivities(userId, 1000);
    
    const stats: ActivityStats = {
      totalActivities: activities.length,
      pageViews: 0,
      courseViews: 0,
      searches: 0,
      calculatorUses: 0,
      contactForms: 0,
      eventRegistrations: 0
    };
    
    activities.forEach(activity => {
      switch (activity.activityType) {
        case ActivityType.PAGE_VIEW:
          stats.pageViews++;
          break;
        case ActivityType.COURSE_VIEW:
          stats.courseViews++;
          break;
        case ActivityType.SEARCH:
          stats.searches++;
          break;
        case ActivityType.CALCULATOR_USE:
          stats.calculatorUses++;
          break;
        case ActivityType.CONTACT_FORM:
          stats.contactForms++;
          break;
        case ActivityType.EVENT_REGISTRATION:
          stats.eventRegistrations++;
          break;
      }
    });
    
    return stats;
  } catch (error) {
    console.error('Error calculating activity stats:', error);
    return {
      totalActivities: 0,
      pageViews: 0,
      courseViews: 0,
      searches: 0,
      calculatorUses: 0,
      contactForms: 0,
      eventRegistrations: 0
    };
  }
};

export const quickLogActivity = async (
  userId: string,
  userRole: UserRole,
  activityType: ActivityType,
  page: string,
  description: string,
  eventId?: string
): Promise<boolean> => {
  const result = await logUserActivity({
    userId,
    userRole,
    activityType,
    description,
    page,
    eventId
  });
  
  return result.success;
};