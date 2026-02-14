/**
 * ישות: אירועים למשתמש
 * User Events Entity
 */

export const EventType = {
  INFO_DAY: 'יום הסבר',
  COLLEGE_TOUR: 'סיור במכללה',
  YEAR_OPENING: 'פתיחת שנה',
  WORKSHOP: 'סדנה',
  WEBINAR: 'הרצאה מקוונת',
  OTHER: 'אחר'
} as const;

export type EventType = typeof EventType[keyof typeof EventType];

export const TargetAudience = {
  CANDIDATE: 'מועמד',
  STUDENT: 'סטודנט',
  ALL: 'כולם'
} as const;

export type TargetAudience = typeof TargetAudience[keyof typeof TargetAudience];

export const EventStatus = {
  OPEN: 'פתוח',
  FULL: 'מלא',
  ENDED: 'הסתיים'
} as const;

export type EventStatus = typeof EventStatus[keyof typeof EventStatus];

export interface UserEvent {
  eventId: string;
  name: string;
  type: EventType;
  description: string;
  dateTime: Date | any;
  location: string;
  targetAudience: TargetAudience;
  maxParticipants?: number;
  currentParticipants: number;
  status: EventStatus;
  registrationLink?: string;
  createdAt: Date | any;
  updatedAt: Date | any;
}

export interface UserEventInput {
  name: string;
  type: EventType;
  description: string;
  dateTime: Date;
  location: string;
  targetAudience: TargetAudience;
  maxParticipants?: number;
  status: EventStatus;
  registrationLink?: string;
}

export class UserEventValidator {
  static validate(input: UserEventInput, isNewEvent: boolean = true): { 
    valid: boolean; 
    errors: string[] 
  } {
    const errors: string[] = [];
    
    if (!input.name || input.name.trim() === '') {
      errors.push('שם האירוע הוא שדה חובה');
    } else if (input.name.length < 2 || input.name.length > 80) {
      errors.push('שם האירוע חייב להיות בין 2 ל-80 תווים');
    } else if (/<|>|\/|script/i.test(input.name)) {
      errors.push('שם האירוע מכיל תווים אסורים');
    }
    
    if (!Object.values(EventType).includes(input.type)) {
      errors.push('סוג האירוע אינו תקין');
    }
    
    if (!input.description || input.description.trim() === '') {
      errors.push('תיאור האירוע הוא שדה חובה');
    } else if (input.description.length < 10 || input.description.length > 300) {
      errors.push('תיאור האירוע חייב להיות בין 10 ל-300 תווים');
    }
    
    if (!input.dateTime) {
      errors.push('תאריך ושעה הם שדות חובה');
    } else if (!(input.dateTime instanceof Date) || isNaN(input.dateTime.getTime())) {
      errors.push('תאריך לא תקין');
    } else if (isNewEvent && input.dateTime < new Date()) {
      errors.push('לא ניתן להזין תאריך עבר לאירוע חדש');
    }
    
    if (!input.location || input.location.trim() === '') {
      errors.push('מיקום האירוע הוא שדה חובה');
    }
    
    if (!Object.values(TargetAudience).includes(input.targetAudience)) {
      errors.push('קהל היעד אינו תקין');
    }
    
    if (input.maxParticipants !== undefined && input.maxParticipants !== null) {
      if (input.maxParticipants <= 0) {
        errors.push('מספר המקומות חייב להיות מספר חיובי');
      }
    }
    
    if (!Object.values(EventStatus).includes(input.status)) {
      errors.push('סטטוס האירוע אינו תקין');
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }
  
  static isDuplicate(
    newEvent: UserEventInput, 
    existingEvents: UserEvent[]
  ): boolean {
    return existingEvents.some(event => {
      const eventDateTime = event.dateTime instanceof Date 
        ? event.dateTime 
        : event.dateTime.toDate();
        
      return (
        event.name === newEvent.name &&
        eventDateTime.getTime() === newEvent.dateTime.getTime()
      );
    });
  }
}