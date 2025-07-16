import { useState } from "react";
import "./App.css";
import { initialFriends } from "./components/initialFriends";
import { Button } from "./components/Button";
import { FriendList } from "./components/FriendList";
import { FormSplitBill } from "./components/FormSplitBill";
import { FormAddFreind } from "./components/FormAddFreind";

//App component
function App() {
  const [friends, setFriends] = useState(initialFriends); //This hook is used for listing a friend.
  const [showAddFriend, setShowAddFriend] = useState(false); //This hook is used to add new friend in friend list.
  const [selectedFriend, setSelectedFriend] = useState(null); //This hook is used to split bill with the selected friend.

  //Below function add new friend in the existing friend list.
  function handleAddNewFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  //Below function used to select friend to split bill with.
  function handleSelectBtn(friend) {
    // setSelectedFriend(friend);
    setSelectedFriend((current) => (current?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  //function used for handle 'Add freind' or 'close' button (used to open or close the form for adding new friend to list)
  function handleAddFriend() {
    setShowAddFriend((show) => !show);
  }

  //The function updates the balance of a specific friend (most likely the one selected) by adding a certain amount (value) to it.
  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          onSelection={handleSelectBtn}
          selectedFriend={selectedFriend}
        ></FriendList>

        {showAddFriend && (
          <FormAddFreind onAddFriend={handleAddNewFriend}></FormAddFreind>
        )}

        <Button onClick={handleAddFriend}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>

      {selectedFriend && (
        <FormSplitBill
          key={selectedFriend.id}
          selectedFriend={selectedFriend}
          handleSplitBill={handleSplitBill}
        ></FormSplitBill>
      )}
    </div>
  );
}

export default App;
