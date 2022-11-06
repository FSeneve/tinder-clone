import {useState} from "react";
import ChatContainer from "../components/ChatContainer";
import TinderCard from "react-tinder-card";

const Dashboard = () => {

  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, nameToDelete)=>{
    setLastDirection(direction);
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  return (
    <div className="dashboard">
                <ChatContainer />
                <div className="swipe-container">
                    <div className="card-container">

        
                            <TinderCard
                                className="swipe"
                                onSwipe={(dir) => swiped(dir, 'Silas')}
                                onCardLeftScreen={() => outOfFrame()}
                                >
                                <div
                                    style={{backgroundImage: "url(" + "" + ")"}}
                                    className="card">
                                    <h3>Francis</h3>
                                </div>
                            </TinderCard>

                        <div className="swipe-info">
                            {lastDirection ? <p>You swiped {lastDirection}</p> : <p/>}
                        </div>
                    </div>
                </div>
            </div>
  )
}

export default Dashboard;