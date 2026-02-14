/**
 * Firebase Service - User Events
 * ניהול אירועים למשתמשים ב-Firestore
 */

import { 
  collection, 
  doc, 
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query, 
  where, 
  orderBy,
  Timestamp,
  increment
} from 'firebase/firestore';
import { firestore } from '../../firebase';
import type { 
  UserEvent, 
  UserEventInput, 
} from '../../models/userEvent.model';
import { 
  UserEventValidator,
  EventStatus,
  TargetAudience 
} from '../../models/userEvent.model';

const COLLECTION_NAME = 'userEvents';

export const createEvent = async (
  input: UserEventInput
): Promise<{ success: boolean; eventId?: string; errors?: string[] }> => {
  try {
    const validation = UserEventValidator.validate(input, true);
    if (!validation.valid) {
      return { success: false, errors: validation.errors };
    }
    
    const existingEvents = await getAllEvents();
    const isDuplicate = UserEventValidator.isDuplicate(input, existingEvents);
    
    if (isDuplicate) {
      return { 
        success: false, 
        errors: ['קיים כבר אירוע עם אותו שם ותאריך'] 
      };
    }
    
    const event: Omit<UserEvent, 'eventId'> = {
      name: input.name,
      type: input.type,
      description: input.description,
      dateTime: Timestamp.fromDate(input.dateTime),
      location: input.location,
      targetAudience: input.targetAudience,
      currentParticipants: 0,
      status: input.status,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      ...(input.maxParticipants && { maxParticipants: input.maxParticipants }),
      ...(input.registrationLink && { registrationLink: input.registrationLink })
    };
    
    const docRef = await addDoc(collection(firestore, COLLECTION_NAME), event);
    
    return { 
      success: true, 
      eventId: docRef.id 
    };
  } catch (error) {
    console.error('Error creating event:', error);
    return { 
      success: false, 
      errors: ['שגיאה ביצירת האירוע. אנא נסה שוב.'] 
    };
  }
};

export const updateEvent = async (
  eventId: string,
  input: Partial<UserEventInput>
): Promise<{ success: boolean; errors?: string[] }> => {
  try {
    const eventRef = doc(firestore, COLLECTION_NAME, eventId);
    
    const eventDoc = await getDoc(eventRef);
    if (!eventDoc.exists()) {
      return { success: false, errors: ['האירוע לא נמצא'] };
    }
    
    const updateData: any = {
      updatedAt: Timestamp.now()
    };
    
    if (input.name) updateData.name = input.name;
    if (input.type) updateData.type = input.type;
    if (input.description) updateData.description = input.description;
    if (input.dateTime) updateData.dateTime = Timestamp.fromDate(input.dateTime);
    if (input.location) updateData.location = input.location;
    if (input.targetAudience) updateData.targetAudience = input.targetAudience;
    if (input.status) updateData.status = input.status;
    if (input.maxParticipants !== undefined) updateData.maxParticipants = input.maxParticipants;
    if (input.registrationLink !== undefined) updateData.registrationLink = input.registrationLink;
    
    await updateDoc(eventRef, updateData);
    
    return { success: true };
  } catch (error) {
    console.error('Error updating event:', error);
    return { 
      success: false, 
      errors: ['שגיאה בעדכון האירוע. אנא נסה שוב.'] 
    };
  }
};

export const deleteEvent = async (
  eventId: string
): Promise<{ success: boolean; errors?: string[] }> => {
  try {
    await deleteDoc(doc(firestore, COLLECTION_NAME, eventId));
    return { success: true };
  } catch (error) {
    console.error('Error deleting event:', error);
    return { 
      success: false, 
      errors: ['שגיאה במחיקת האירוע. אנא נסה שוב.'] 
    };
  }
};

export const getEventById = async (eventId: string): Promise<UserEvent | null> => {
  try {
    const eventDoc = await getDoc(doc(firestore, COLLECTION_NAME, eventId));
    
    if (!eventDoc.exists()) {
      return null;
    }
    
    const data = eventDoc.data();
    return {
      eventId: eventDoc.id,
      ...data,
      dateTime: data.dateTime.toDate(),
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate()
    } as UserEvent;
  } catch (error) {
    console.error('Error fetching event:', error);
    return null;
  }
};

export const getAllEvents = async (): Promise<UserEvent[]> => {
  try {
    const q = query(
      collection(firestore, COLLECTION_NAME),
      orderBy('dateTime', 'asc')
    );
    
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        eventId: doc.id,
        ...data,
        dateTime: data.dateTime.toDate(),
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate()
      } as UserEvent;
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

export const getUpcomingEvents = async (
  targetAudience?: TargetAudience
): Promise<UserEvent[]> => {
  try {
    const now = Timestamp.now();
    const q = query(
      collection(firestore, COLLECTION_NAME),
      where('dateTime', '>=', now),
      orderBy('dateTime', 'asc')
    );
    
    const snapshot = await getDocs(q);
    let events = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        eventId: doc.id,
        ...data,
        dateTime: data.dateTime.toDate(),
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate()
      } as UserEvent;
    });
    
    if (targetAudience) {
      events = events.filter(event => 
        event.targetAudience === targetAudience || 
        event.targetAudience === TargetAudience.ALL
      );
    }
    
    return events;
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    return [];
  }
};

export const getOpenEvents = async (
  targetAudience?: TargetAudience
): Promise<UserEvent[]> => {
  try {
    const upcomingEvents = await getUpcomingEvents(targetAudience);
    return upcomingEvents.filter(event => event.status === EventStatus.OPEN);
  } catch (error) {
    console.error('Error fetching open events:', error);
    return [];
  }
};

export const registerToEvent = async (
  eventId: string
): Promise<{ success: boolean; errors?: string[] }> => {
  try {
    const event = await getEventById(eventId);
    
    if (!event) {
      return { success: false, errors: ['האירוע לא נמצא'] };
    }
    
    if (event.status !== EventStatus.OPEN) {
      return { success: false, errors: ['האירוע אינו פתוח להרשמה'] };
    }
    
    if (event.maxParticipants && event.currentParticipants >= event.maxParticipants) {
      await updateDoc(doc(firestore, COLLECTION_NAME, eventId), {
        status: EventStatus.FULL
      });
      return { success: false, errors: ['האירוע מלא'] };
    }
    
    await updateDoc(doc(firestore, COLLECTION_NAME, eventId), {
      currentParticipants: increment(1)
    });
    
    if (event.maxParticipants && event.currentParticipants + 1 >= event.maxParticipants) {
      await updateDoc(doc(firestore, COLLECTION_NAME, eventId), {
        status: EventStatus.FULL
      });
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error registering to event:', error);
    return { 
      success: false, 
      errors: ['שגיאה בהרשמה לאירוע. אנא נסה שוב.'] 
    };
  }
};

export const unregisterFromEvent = async (
  eventId: string
): Promise<{ success: boolean; errors?: string[] }> => {
  try {
    const event = await getEventById(eventId);
    
    if (!event) {
      return { success: false, errors: ['האירוע לא נמצא'] };
    }
    
    if (event.currentParticipants > 0) {
      await updateDoc(doc(firestore, COLLECTION_NAME, eventId), {
        currentParticipants: increment(-1),
        status: EventStatus.OPEN
      });
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error unregistering from event:', error);
    return { 
      success: false, 
      errors: ['שגיאה בביטול ההרשמה. אנא נסה שוב.'] 
    };
  }
};

export const updateExpiredEvents = async (): Promise<void> => {
  try {
    const now = Timestamp.now();
    const q = query(
      collection(firestore, COLLECTION_NAME),
      where('dateTime', '<', now),
      where('status', '!=', EventStatus.ENDED)
    );
    
    const snapshot = await getDocs(q);
    
    const updatePromises = snapshot.docs.map(doc => 
      updateDoc(doc.ref, { status: EventStatus.ENDED })
    );
    
    await Promise.all(updatePromises);
  } catch (error) {
    console.error('Error updating expired events:', error);
  }
};