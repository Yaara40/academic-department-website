/**
 * ישות: היסטוריית פעילות משתמש
 */

export const UserRole = {
  CANDIDATE: 'מועמד',
  STUDENT: 'סטודנט',
  GRADUATE: 'בוגר',
  ADMIN: 'מנהל מערכת'
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export const ActivityType = {
  PAGE_VIEW: 'כניסה לעמוד',
  COURSE_VIEW: 'צפייה בקורס',
  SEARCH: 'חיפוש',
  CALCULATOR_USE: 'מילוי מחשבון',
  CONTACT_FORM: 'שליחת טופס צור קשר',
  EVENT_REGISTRATION: 'הרשמה לאירוע'
} as const;

export type ActivityType = typeof ActivityType[keyof typeof ActivityType];

export interface UserActivity {
  activityId: string;
  userId: string;
  userRole: UserRole;
  activityType: ActivityType;
  description: string;
  page: string;
  timestamp: Date | any;
  eventId?: string;
}

export interface UserActivityInput {
  userId: string;
  userRole: UserRole;
  activityType: ActivityType;
  description: string;
  page: string;
  eventId?: string;
}

export class UserActivityValidator {
  static validate(input: UserActivityInput): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (!input.userId || input.userId.trim() === '') {
      errors.push('מזהה משתמש הוא שדה חובה');
    }
    
    if (input.userId.includes('@')) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.userId)) {
        errors.push('פורמט האימייל אינו תקין');
      }
    }
    
    if (!Object.values(UserRole).includes(input.userRole)) {
      errors.push('תפקיד משתמש אינו תקין');
    }
    
    if (!Object.values(ActivityType).includes(input.activityType)) {
      errors.push('סוג פעילות אינו תקין');
    }
    
    if (!input.page || input.page.trim() === '') {
      errors.push('שם העמוד הוא שדה חובה');
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }
}