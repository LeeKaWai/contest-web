"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { GetContets } from "../../../../api/contest";

function ContestList() {
  const [contests, setContests] = useState([]);
  const [loading, setLoadding] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const datas = await GetContets();
        setContests(datas);
      } catch (error) {}
    };

    fetchDatas();
  }, []);

  const handleClick = (id) => {
    router.push(`/contest/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h2>Contest List</h2>
        <ul>
          {contests.map((user) => (
            <li key={user.id} onClick={() => handleClick(user.id)}>
              {user.title} ({user.description})
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ContestList;
