import React from "react";
import Comments from "./comments/Comments";

// this could be moved to a separate file and then fetched via async api call
const data = [
  {
    data: "#1",
    id: "1",
    user_meta: {
      name: "Akshay",
      icon: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    },
    reply: [
      {
        data: "Snapchat #1.1",
        id: "1.1",
        user_meta: {
          name: "Raghav",
          icon: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
        },
        reply: [
          {
            data: "Dropbox #1.1.1",
            id: "1.1.1",
            user_meta: {
              name: "Sanjay",
              icon: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
            },
            reply: [],
          },
        ],
      },
      {
        data: "Snapchat #1.2",
        id: "1.2",
        user_meta: {
          name: "XYZ",
          icon: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
        },
        reply: [
          {
            data: "Dropbox #1.2.1",
            id: "1.2.1",
            user_meta: {
              name: "ABC",
              icon: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
            },
            reply: [],
          },
        ],
      },
    ],
  },
  {
    data: "#2",
    id: "2",
    user_meta: {
      name: "playing fire",
      icon: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    },
    reply: [
      {
        data: "Snapchat #2",
        id: "2.1",
        user_meta: {
          name: "Singing bird",
          icon: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
        },
        reply: [
          {
            data: "Dropbox #2",
            id: "2.1.1",
            user_meta: {
              name: "Dancing couple",
              icon: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
            },
            reply: [],
          },
        ],
      },
    ],
  },
];

function App() {
  return (
    <div className="m-4">
      <Comments data={data} />
    </div>
  );
}

export default App;
