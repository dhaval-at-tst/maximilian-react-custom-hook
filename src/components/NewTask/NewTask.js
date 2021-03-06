import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from './../../hooks/use-http';

const NewTask = (props) => {
  const { isLoading, error, sendRequest: addTadkRequest } = useHttp();

  const enterTaskHandler = async (taskText) => {

    const createTask = (taskData) => {
      const generatedId = taskData.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };

      props.onAddTask(createdTask);
    }

    addTadkRequest({
      url: 'https://react-http-199f6-default-rtdb.firebaseio.com/tasks.json',
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: { text: taskText }
    }, createTask);
  }

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;