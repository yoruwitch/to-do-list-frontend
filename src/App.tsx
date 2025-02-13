import "./App.css";
import FormComponent from "./components/form/FormComponent";
import NavbarComponent from "./components/navbar/NavbarComponent";
import TaskBoardComponent from "./components/taskboard/TaskBoardComponent";

function App() {
    return (
        <>
            <NavbarComponent />
            <FormComponent />
            <TaskBoardComponent />
        </>
    );
}

export default App;
