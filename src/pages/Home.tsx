import WelcomeBox from '../components/WelcomeBox';
import CourseList from '../features/courses/components/CourseList';

const Home = () => {
  return (
    <div style={{ direction: 'rtl' }}>
      <WelcomeBox />
      <CourseList />
    </div>
  );
};

export default Home;