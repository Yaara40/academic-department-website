import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import CoursesManagement from './pages/CoursesManagement';
import CoursesForm from './features/courses/components/CoursesForm';
import GrowthManagement from "./pages/GrowthManagement";
import ContactManagement from './pages/ContactManagement';
import HelpManagement from './pages/HelpManagement';

const App = () => {
  useEffect(() => {
    // 1. קורסים
    if (!localStorage.getItem('courses')) {
      const initialCourses = [
        { id: "1", name: "מבוא למחשבים", credits: 4, semester: "א", courseId: "10101", description: "קורס יסוד במדעי המחשב", year: "שנה א", syllabus: "https://example.com/101", isMandatory: "yes", isActive: "yes" },
        { id: "2", name: "אלגוריתמים", credits: 5, semester: "א", courseId: "10102", description: "קורס מתקדם באלגוריתמים", year: "שנה ב", syllabus: "https://example.com/102", isMandatory: "yes", isActive: "yes" },
        { id: "3", name: "מבני נתונים", credits: 4, semester: "ב", courseId: "10103", description: "מבני נתונים מתקדמים", year: "שנה ב", syllabus: "https://example.com/103", isMandatory: "yes", isActive: "yes" },
        { id: "4", name: "תכנות מונחה עצמים", credits: 4, semester: "ב", courseId: "10104", description: "עקרונות OOP", year: "שנה ב", syllabus: "https://example.com/104", isMandatory: "yes", isActive: "yes" },
        { id: "5", name: "מערכות הפעלה", credits: 5, semester: "א", courseId: "10105", description: "עקרונות מערכות הפעלה", year: "שנה ג", syllabus: "https://example.com/105", isMandatory: "yes", isActive: "yes" },
        { id: "6", name: "רשתות מחשבים", credits: 4, semester: "ב", courseId: "10106", description: "תקשורת ורשתות", year: "שנה ג", syllabus: "https://example.com/106", isMandatory: "yes", isActive: "yes" },
        { id: "7", name: "בסיסי נתונים", credits: 4, semester: "א", courseId: "10107", description: "מסדי נתונים יחסיים", year: "שנה ג", syllabus: "https://example.com/107", isMandatory: "yes", isActive: "yes" },
        { id: "8", name: "בינה מלאכותית", credits: 3, semester: "ב", courseId: "10108", description: "מבוא ל-AI", year: "שנה ד", syllabus: "https://example.com/108", isMandatory: "no", isActive: "yes" },
        { id: "9", name: "למידת מכונה", credits: 3, semester: "א", courseId: "10109", description: "אלגוריתמי ML", year: "שנה ד", syllabus: "https://example.com/109", isMandatory: "no", isActive: "yes" },
        { id: "10", name: "אבטחת מידע", credits: 4, semester: "ב", courseId: "10110", description: "אבטחה ברשת", year: "שנה ד", syllabus: "https://example.com/110", isMandatory: "no", isActive: "yes" },
      ];
      localStorage.setItem('courses', JSON.stringify(initialCourses));
    }

    // 2. אנשי קשר (השארת פרטים)
    if (!localStorage.getItem('contacts')) {
      const initialContacts = [
        { id: "1", name: "יוסי כהן", email: "yossi@email.com", phone: "050-1234567", submissionDate: "25/11/2025", status: "חדש", source: "אתר" },
        { id: "2", name: "שרה לוי", email: "sara@email.com", phone: "052-9876543", submissionDate: "26/11/2025", status: "ממתין", source: "יום פתוח" },
        { id: "3", name: "דוד ישראלי", email: "david@email.com", phone: "054-5555555", submissionDate: "27/11/2025", status: "נוצר קשר", source: "אתר" },
        { id: "4", name: "מיכל אברהם", email: "michal@email.com", phone: "053-1111111", submissionDate: "28/11/2025", status: "חדש", source: "פייסבוק" },
        { id: "5", name: "רון גבאי", email: "ron@email.com", phone: "050-2222222", submissionDate: "29/11/2025", status: "חדש", source: "אתר" },
        { id: "6", name: "נועה מזרחי", email: "noa@email.com", phone: "052-3333333", submissionDate: "30/11/2025", status: "ממתין", source: "לינקדאין" },
        { id: "7", name: "אלון ברק", email: "alon@email.com", phone: "054-4444444", submissionDate: "01/12/2025", status: "נוצר קשר", source: "אתר" },
        { id: "8", name: "תמר שטרן", email: "tamar@email.com", phone: "053-5555555", submissionDate: "02/12/2025", status: "חדש", source: "יום פתוח" },
        { id: "9", name: "עידן פלד", email: "idan@email.com", phone: "050-6666666", submissionDate: "03/12/2025", status: "ממתין", source: "פייסבוק" },
        { id: "10", name: "לירון חזן", email: "liron@email.com", phone: "052-7777777", submissionDate: "04/12/2025", status: "נסגר", source: "אתר" },
      ];
      localStorage.setItem('contacts', JSON.stringify(initialContacts));
    }

    // 3. דרישות התואר
    if (!localStorage.getItem('requirements')) {
      const initialRequirements = [
        { id: "1", title: "שנות לימוד", subtitle: "3-4 שנים", value: "3-4", color: "#dbeafe" },
        { id: "2", title: "פרויקטים מעשיים", subtitle: "לפחות שני פרויקטים גדולים", value: "+2", color: "#d1fae5" },
        { id: "3", title: "רמת אנגלית", subtitle: "ציון מינימלי באמי״ר", value: "+85", color: "#e9d5ff" },
        { id: "4", title: "נקודות זכות כוללות", subtitle: "מינימום נקודות זכות לתואר", value: "120", color: "#fed7aa" },
        { id: "5", title: "קורסי חובה", subtitle: "קורסים חובה במסלול", value: "25", color: "#fef3c7" },
        { id: "6", title: "פרויקט גמר", subtitle: "פרויקט סיום לתואר", value: "1", color: "#fce7f3" },
        { id: "7", title: "התמחות", subtitle: "שבועות התמחות בתעשייה", value: "12", color: "#dbeafe" },
        { id: "8", title: "קורסי בחירה", subtitle: "מתוך רשימת בחירה", value: "18", color: "#d1fae5" },
        { id: "9", title: "ממוצע מינימלי", subtitle: "ממוצע נדרש לסיום", value: "75", color: "#fed7aa" },
        { id: "10", title: "סמינריונים", subtitle: "השתתפות בסמינרים", value: "4", color: "#e9d5ff" },
      ];
      localStorage.setItem('requirements', JSON.stringify(initialRequirements));
    }

    // 4. מאמרים
    if (!localStorage.getItem('articles')) {
      const initialArticles = [
        { id: "1", title: "מדריך קריירה בהייטק 2025", imageUrl: "https://via.placeholder.com/100", tags: ["קריירה"] },
        { id: "2", title: "מהפכת הבינה המלאכותית", imageUrl: "https://via.placeholder.com/100", tags: ["AI", "חדש"] },
        { id: "3", title: "להקים סטארטאפ - המדריך השלם", imageUrl: "https://via.placeholder.com/100", tags: ["יזמות"] },
        { id: "4", title: "תכנות בפייתון למתחילים", imageUrl: "https://via.placeholder.com/100", tags: ["תכנות"] },
        { id: "5", title: "מה חדש ב-React 19", imageUrl: "https://via.placeholder.com/100", tags: ["פיתוח", "חדש"] },
        { id: "6", title: "אבטחת מידע בעידן הדיגיטלי", imageUrl: "https://via.placeholder.com/100", tags: ["אבטחה"] },
        { id: "7", title: "DevOps - מדריך מקיף", imageUrl: "https://via.placeholder.com/100", tags: ["DevOps"] },
        { id: "8", title: "עולם ה-Cloud Computing", imageUrl: "https://via.placeholder.com/100", tags: ["Cloud"] },
        { id: "9", title: "מדע הנתונים למתקדמים", imageUrl: "https://via.placeholder.com/100", tags: ["Data Science"] },
        { id: "10", title: "פיתוח משחקים ב-Unity", imageUrl: "https://via.placeholder.com/100", tags: ["משחקים"] },
      ];
      localStorage.setItem('articles', JSON.stringify(initialArticles));
    }

    // 5. המלצות בוגרים
    if (!localStorage.getItem('testimonials')) {
      const initialTestimonials = [
        { id: "1", name: "נועה כהן", company: "מפתחת בכירה ב-Google", text: "הלימודים נתנו לי את הכלים והביטחון להצליח בעולם הגלובלי", initial: "נ", color: "#10b981" },
        { id: "2", name: "דני לוי", company: "מייסד ו-CEO ב-TechCorp", text: "הידע שרכשתי כאן היה הבסיס להקמת החברה שלי", initial: "ד", color: "#10b981" },
        { id: "3", name: "מיכל שפירא", company: "חוקרת AI בטכניון ווייצמן", text: "המחלקה אפשרה לי להתמקצע במחקר ברמה הגבוהה ביותר", initial: "מ", color: "#10b981" },
        { id: "4", name: "יוסי ברקוביץ", company: "Senior Dev ב-Microsoft", text: "הקורסים המעשיים הכינו אותי לעבודה בחברות הגדולות", initial: "י", color: "#10b981" },
        { id: "5", name: "שרה אלון", company: "Product Manager ב-Meta", text: "הרקע האקדמי עזר לי להבין את הטכנולוגיה לעומק", initial: "ש", color: "#10b981" },
        { id: "6", name: "רון גולן", company: "CTO ב-CyberStartup", text: "התואר פתח לי דלתות לעולם האבטחה והסייבר", initial: "ר", color: "#10b981" },
        { id: "7", name: "תמר לב", company: "Data Scientist ב-Intel", text: "הלימודים במדעי הנתונים היו מצוינים ורלוונטיים", initial: "ת", color: "#10b981" },
        { id: "8", name: "אורי כץ", company: "Full Stack Developer", text: "היכולת לבנות פרויקטים מאפס - זה מה שלמדתי כאן", initial: "א", color: "#10b981" },
        { id: "9", name: "ליאת רוזן", company: "UX Researcher", text: "השילוב של טכנולוגיה ומחקר היה מושלם", initial: "ל", color: "#10b981" },
        { id: "10", name: "עומר דוד", company: "Cloud Architect ב-AWS", text: "הבסיס התיאורטי עזר לי להבין ארכיטקטורות מורכבות", initial: "ע", color: "#10b981" },
      ];
      localStorage.setItem('testimonials', JSON.stringify(initialTestimonials));
    }

    // 6. פרטי התקשרות
    if (!localStorage.getItem('contactInfo')) {
      const initialContactInfo = {
        phone: "050-1234567",
        email: "info@example.com",
        address: "רחוק האקדמיה 123, תל אביב, ישראל",
        facebook: "https://facebook.com/example",
        instagram: "https://instagram.com/example",
        linkedin: "https://linkedin.com/company/example",
        youtube: "https://youtube.com/@example",
      };
      localStorage.setItem('contactInfo', JSON.stringify(initialContactInfo));
    }
  }, []);

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      <Header />
      <main style={{ 
        flex: 1, 
        padding: '20px', 
        marginRight: '220px'
      }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<CoursesManagement />} />
          <Route path="/courses/new" element={<CoursesForm />} />
          <Route path="/growth" element={<GrowthManagement />} />
          <Route path="/contact" element={<ContactManagement />} />
          <Route path="/help" element={<HelpManagement />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;