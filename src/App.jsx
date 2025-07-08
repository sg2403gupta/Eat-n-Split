import { useState } from "react";
import "./App.css";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

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
          selectedFriend={selectedFriend}
          handleSplitBill={handleSplitBill}
        ></FormSplitBill>
      )}
    </div>
  );
}

export default App;

// Resuable Button component
function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}

//Friend list component
function FriendList({ friends, onSelection, selectedFriend }) {
  // const friends = initialFriends;
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        ></Friend>
      ))}
    </ul>
  );
}

// Add Friend(componenet) to a friends list.
function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className="red">
          you owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}

      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {friend.balance}$
        </p>
      )}

      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

// Form for adding a new friend to a list.(Component)
function FormAddFreind({ onAddFriend }) {
  const [name, setName] = useState(""); //This hook is used to read name value in form.
  const [image, setImage] = useState("https://i.pravatar.cc/48"); //This is used to add random persons image to friend.

  //This function adds a new friend to a existing list.
  function handleSubmitButton(e) {
    e.preventDefault();

    if (!name || !image) return;
    const newFriend = {
      id: crypto.randomUUID(),
      name,
      image: `${image}?={id}`,
      balance: 0,
    };

    onAddFriend(newFriend);

    setName(""); //Make name input field empty.
    setImage("https://i.pravatar.cc/48"); //Used for set default image.
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmitButton}>
      <label>🧑‍🤝‍🧑Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>🏞️Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

//Form for splitting the bill.(Component)
function FormSplitBill({ selectedFriend, handleSplitBill }) {
  const [bill, setBill] = useState(""); //Hook for bill input.
  const [paidByUser, setPaidByUser] = useState(""); //Hook for user bill amount

  //Calculate amount of bill value for friend.
  const paidByFriend = bill ? bill - paidByUser : "";

  const [whoIsPaying, setWhoIsPaying] = useState("user"); //Hook for deciding who will going to pay bill.

  function handleSubmitButton(e) {
    e.preventDefault();

    if (!bill || !paidByUser) return;

    handleSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmitButton}>
      <h2>Split bill with {selectedFriend.name}</h2>
      <label>💵Bill Value💰</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🧑‍🦰Your Expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />

      <label>🧑‍🤝‍🧑Friend's expense</label>
      <input type="text" disabled value={paidByFriend} />

      <label>🤑Who is paying the bill?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
