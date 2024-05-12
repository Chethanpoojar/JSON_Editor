import React, { useState, useEffect } from "react";

const List = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([
    {
      id: 1,
      name: "chethan",
    },
    {
      id: 2,
      name: "rahul",
    },
    {
      id: 3,
      name: "rama",
    },
    {
      id: 4,
      name: "kowshi",
    },
    {
      id: 5,
      name: "chandan",
    },
  ]);

  useEffect(() => {
    if (searchText) {
      const res = data.filter((val) => val.name.includes(searchText));
      setData(res);
    }
  }, [searchText]);

  return (
    <div>
      <div>
        <input
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
      </div>

      <div>
        {data?.map((val) => (
          <p>{val.name}</p>
        ))}
      </div>
    </div>
  );
};

export default List;
