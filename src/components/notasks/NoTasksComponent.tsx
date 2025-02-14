import scarecrow from "../../assets/scarecrow404.png";
import "./notasks.css";
function NoTasksComponent() {
    return (
        <>
            <div className="empty_taskboard">
                <img src={scarecrow} alt="Logo" id="image_404" />
                <span>You don't have a new task yet.</span>
            </div>
        </>
    );
}

export default NoTasksComponent;
